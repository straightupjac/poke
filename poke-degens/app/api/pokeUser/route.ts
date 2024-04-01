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
    const reqBody = await req.json();
    const { usernameToPoke, custodyAddressOfPoker, verifiedAddressOfPoker } =
      reqBody;

    if (!usernameToPoke || !isString(usernameToPoke))
      throw new Error("usernameToPoke is required");

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
      message: `${fromUsername} poked ${usernameToPoke}! Points added to ${address}`,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ err }, { status: 403 });
  }
};
