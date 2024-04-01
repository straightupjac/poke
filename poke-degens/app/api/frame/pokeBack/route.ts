import { NextApiRequest, NextApiResponse } from "next";
import { neynarClient, POKE_CHANNEL_ID } from "@/utils/neynar/neynar";
import { stackClient, StackEvent } from "@/utils/stacks";
import { Env } from "@/utils/envSetup";
import { FRAME_URL } from "@/utils/crypto";

/**
 * @param req
 * body: {
fid: string,
castId: {
  hash: string,
  fid: string,
}
 * }
 */
export const POST = async (req: Request) => {
  try {
    const reqBody = await req.json();
    const { fid, castId } = reqBody;
    console.log("pokeBack", fid, castId);

    if (!fid) throw new Error("fid is required");
    if (!castId) throw new Error("castId is required");
    const result = await neynarClient.lookUpCastByHashOrWarpcastUrl(
      castId.hash,
      "hash"
    );

    const { cast } = result;
    const mentionedProfiles = cast.mentioned_profiles;
    const text = cast.text;
    console.log("pokeBack", mentionedProfiles, text);

    const usernameToPoke = mentionedProfiles[0].username;
    const usernamePoked = mentionedProfiles[1].username;

    const pokeUser = (await neynarClient.fetchBulkUsers([fid])).users[0];
    const fromUsername = pokeUser.username;
    if (fromUsername !== usernamePoked) {
      return Response.json(
        {
          message: "You can only poke back the user who poked you",
          success: false,
        },
        { status: 403 }
      );
    }
    let address = null;
    if (pokeUser.verified_addresses.eth_addresses.length) {
      address = pokeUser.verified_addresses.eth_addresses[0];
    } else {
      address = pokeUser.custody_address;
    }

    /** publish poke cast on warpcast */
    await neynarClient.publishCast(
      Env.NEYNAR_SIGNER_UUID,
      `@${fromUsername} poked @${usernameToPoke}`,
      {
        embeds: [
          {
            url: FRAME_URL,
          },
        ],
        channelId: POKE_CHANNEL_ID,
      }
    );

    /** register poke on leaderboard */
    await stackClient.track(StackEvent.user_poke, {
      points: 10,
      account: address,
    });
    return Response.json({
      message: `${fromUsername} poked ${usernameToPoke} back! Points added to ${address}`,
      success: true,
    });
  } catch (err) {
    return Response.json({ err }, { status: 403 });
  }
};
