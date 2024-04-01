import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") throw new Error("Invalid method");
    res.status(200).json("ok");
  } catch (err) {
    res.status(403).json({ err });
  }
};

export default handler;
``;
