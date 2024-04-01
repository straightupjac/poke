import { NextApiRequest, NextApiResponse } from "next";
import { neynarClient, POKE_CHANNEL_ID } from "@/utils/neynar/neynar";
import { stackClient, StackEvent } from "@/utils/stacks";
import { Env } from "@/utils/envSetup";

/**
 * @param req
 * body: {
 *  usernameToPoke: string,
 *  one of the following must be provided:
 *    verifiedAddressOfPoker: string,
 *    custodyAddressOfPoker: string,
 * }
 */
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") throw new Error("Invalid method");
    const { fid, castId, messageHash } = req.body;
    console.log("pokeBack", fid, castId, messageHash);

    if (!fid) throw new Error("fid is required");
    if (!castId) throw new Error("castId is required");
    const result = await neynarClient.lookUpCastByHashOrWarpcastUrl(
      castId.hash,
      "hash"
    );
    const pokeUser = (await neynarClient.fetchBulkUsers([fid])).users[0];
    const fromUsername = pokeUser.username;
    let address = null;
    if (pokeUser.verified_addresses.eth_addresses.length) {
      address = pokeUser.verified_addresses.eth_addresses[0];
    } else {
      address = pokeUser.custody_address;
    }

    const { cast } = result;
    const mentionedProfiles = cast.mentioned_profiles;
    const text = cast.text;
    console.log("pokeBack", mentionedProfiles, text);

    const usernameToPoke = mentionedProfiles[0].username;

    /** publish poke cast on warpcast */
    await neynarClient.publishCast(
      Env.NEYNAR_SIGNER_UUID,
      `@${fromUsername} poked @${usernameToPoke}`,
      {
        channelId: POKE_CHANNEL_ID,
      }
    );

    /** register poke on leaderboard */
    await stackClient.track(StackEvent.user_poke, {
      points: 10,
      account: address,
    });
    res.status(200).json({
      message: `${fromUsername} poked ${usernameToPoke} back! Points added to ${address}`,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({ err });
  }
};

export default handler;
