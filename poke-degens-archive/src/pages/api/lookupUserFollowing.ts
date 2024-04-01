import { NextApiRequest, NextApiResponse } from "next";
import isString from "lodash/isString";
import { neynarClient } from "@/utils/neynar/neynar";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") throw new Error("Invalid method");

    const { username } = req.query;
    if (!username || !isString(username))
      throw new Error("Address is required");

    const {
      result: { user },
    } = await neynarClient.lookupUserByUsername(username);

    console.log("lookupUserFollowing: ", user);
    const result = await neynarClient.fetchUserFollowing(user.fid);
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ err });
  }
};

export default handler;
