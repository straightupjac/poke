import { NextApiRequest, NextApiResponse } from "next";
import { STACK_EVENTS, stackClient } from "../../utils/stacks";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") throw new Error("Invalid method");

    const { address, stackEvent } = req.body;
    if (!address || !stackEvent)
      throw new Error("Address and stackEvent are required");

    if (STACK_EVENTS.indexOf(stackEvent) === -1) {
      throw new Error("Invalid event");
    }
    const result = await stackClient.track(stackEvent, {
      points: 10,
      account: address,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ err });
  }
};

export default handler;
