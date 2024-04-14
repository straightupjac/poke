import isString from "lodash/isString";
import { neynarClient, POKE_CHANNEL_ID } from "@/utils/neynar/neynar";
import { stackClient, StackEvent } from "@/utils/stacks";
import { Env } from "@/utils/envSetup";
import { NextResponse } from "next/server";
import { FRAME_URL } from "@/utils/crypto";

/**
 * @param req
 * body: {
 *  usernameToPoke: string,
 *  one of the following must be provided:
 *    verifiedAddressOfPoker: string,
 *    custodyAddressOfPoker: string,
 * }
 */
export const POST = async (req: Request) => {
  try {
    console.log("poking user back");
    const reqBody = await req.json();
    const {
      usernameToPoke,
      pokeHash,
      custodyAddressOfPoker,
      verifiedAddressOfPoker,
    } = reqBody;

    if (!usernameToPoke || !isString(usernameToPoke))
      throw new Error("usernameToPoke is required");

    if (!pokeHash || !isString(pokeHash)) {
      throw new Error("pokeHash is required");
    }

    if (
      (!custodyAddressOfPoker || !isString(custodyAddressOfPoker)) &&
      (!verifiedAddressOfPoker || !isString(verifiedAddressOfPoker))
    ) {
      throw new Error(
        "custody address or verifiedAddressOfPoker of poker is required"
      );
    }

    let userToPoke = null;
    try {
      const result = await neynarClient.lookupUserByUsername(usernameToPoke);
      userToPoke = result.result.user;
      if (!userToPoke) throw new Error(`User ${usernameToPoke} not found`);
    } catch (err) {
      return NextResponse.json(err, { status: 404 });
    }

    let fromUsername = null;
    let address = null;
    if (verifiedAddressOfPoker) {
      console.log("verifiedAddressOfPoker", verifiedAddressOfPoker);
      const result = await neynarClient.fetchBulkUsersByEthereumAddress([
        verifiedAddressOfPoker,
      ]);
      const user = result[verifiedAddressOfPoker.toLowerCase()][0];
      fromUsername = user.username;
      address = verifiedAddressOfPoker;
    } else if (custodyAddressOfPoker) {
      const result = await neynarClient.lookupUserByCustodyAddress(
        custodyAddressOfPoker
      );
      const user = result.user;
      fromUsername = user.username;
      address = custodyAddressOfPoker;
    }

    const lastPokeChainCast = await neynarClient.lookUpCastByHashOrWarpcastUrl(
      `https://warpcast.com/pokedegen/${pokeHash}`,
      "url"
    );

    /** validate the poke is for these users */
    const parentCast = lastPokeChainCast.cast;
    const mentionedProfiles = parentCast.mentioned_profiles;
    const usernamePoked = mentionedProfiles[1].username;
    if (fromUsername !== usernamePoked) {
      return Response.json(
        {
          message: "You are not the user who was poked",
          success: false,
        },
        { status: 403 }
      );
    }
    const originalPoker = mentionedProfiles[0].username;
    if (originalPoker !== usernameToPoke) {
      return Response.json(
        {
          message: "You can only poke back the user who poked you",
          success: false,
        },
        { status: 403 }
      );
    }

    if (lastPokeChainCast.cast.replies.count > 0) {
      const getCastThread = await neynarClient.fetchAllCastsInThread(
        lastPokeChainCast.cast.hash
      );
      // make sure no one has poked back yet
      const alreadyPokedBack = getCastThread.result.casts.find((cast) => {
        return cast.text
          .trim()
          .includes(`@${fromUsername} poked @${usernameToPoke} back`);
      });
      if (alreadyPokedBack) {
        return Response.json(
          {
            message: `${fromUsername} already poked ${usernameToPoke} back! You can't poke back until they poke you.`,
            cast: alreadyPokedBack,
          },
          { status: 429 }
        );
      }
    }
    const castToReplyTo = lastPokeChainCast.cast.hash;

    /** publish poke cast on warpcast */
    const cast = await neynarClient.publishCast(
      Env.NEYNAR_SIGNER_UUID,
      `@${fromUsername} poked @${usernameToPoke} back!`,
      {
        embeds: [
          {
            url: FRAME_URL,
          },
        ],
        channelId: POKE_CHANNEL_ID,
        replyTo: castToReplyTo,
      }
    );

    /** register poke on leaderboard */
    await stackClient.track(StackEvent.user_poke_back, {
      points: 10,
      account: address,
    });

    return Response.json({
      message: `${fromUsername} poked ${usernameToPoke} back! Points added to ${address}`,
      cast,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ err }, { status: 403 });
  }
};
