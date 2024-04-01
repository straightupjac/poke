import { NextApiRequest, NextApiResponse } from "next";
import isString from "lodash/isString";
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
    console.log("pokeOther", req.body);

    const { fid, castId } = req.body;
    if (!fid) throw new Error("fid is required");
    if (!castId) throw new Error("castId is required");

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(403).json({ err });
  }
};

export default handler;