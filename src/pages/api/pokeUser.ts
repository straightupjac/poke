import { NextApiRequest, NextApiResponse } from "next";
import isString from "lodash/isString";
import { neynarClient } from "@/utils/neynar/neynar";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") throw new Error("Invalid method");

    const { usernameToPoke, addressOfPoker, usernameOfPoker } = req.body;
    if (!usernameToPoke || !isString(usernameToPoke))
      throw new Error("usernameToPoke is required");

    if (
      (!addressOfPoker || !isString(addressOfPoker)) &&
      (!usernameOfPoker || !isString(usernameOfPoker))
    ) {
      throw new Error("Address or username of poker is required");
    }

    let userToPoke = null;
    try {
      const result = await neynarClient.lookupUserByUsername(usernameToPoke);
      userToPoke = result.result.user;
      if (!userToPoke) throw new Error(`User ${usernameToPoke} not found`);
    } catch (err) {
      res.status(403).json({ data: err });
    }

    let fromUsername = null;
    if (usernameOfPoker) {
      fromUsername = usernameOfPoker;
    } else if (addressOfPoker) {
      const result = await neynarClient.fetchBulkUsersByEthereumAddress([
        addressOfPoker,
      ]);
      const user = result[addressOfPoker.toLowerCase()][0];
      fromUsername = user.username;
    }
    res.status(200).json({
      message: `${fromUsername} poked ${usernameToPoke}!`,
    });
  } catch (err) {
    res.status(403).json({ err });
  }
};

export default handler;
