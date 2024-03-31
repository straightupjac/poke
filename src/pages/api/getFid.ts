import { NextApiRequest, NextApiResponse } from "next";
import isString from "lodash/isString";
import { neynarClient } from "@/utils/neynar";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") throw new Error("Invalid method");

    const { address } = req.query;
    if (!address || !isString(address)) throw new Error("Address is required");
    const result = await neynarClient.fetchBulkUsersByEthereumAddress([
      address,
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ err });
  }
};

export default handler;
