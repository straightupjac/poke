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
export const POST = async (req: Request) => {
  try {
    const reqBody = await req.json();

    const { fid, castId } = reqBody;
    if (!fid) throw new Error("fid is required");
    if (!castId) throw new Error("castId is required");

    return Response.json({ message: "not implemented yet" }, { status: 501 });
  } catch (err) {
    console.error(err);
    return Response.json(err, { status: 403 });
  }
};
