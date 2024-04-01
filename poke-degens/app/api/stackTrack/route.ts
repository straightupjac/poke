import { NextApiRequest, NextApiResponse } from "next";
import { STACK_EVENTS, stackClient } from "../../../utils/stacks";

export const POST = async (req: Request) => {
  try {
    const reqBody = await req.json();
    const { address, stackEvent } = reqBody;
    if (!address || !stackEvent)
      throw new Error("Address and stackEvent are required");

    if (STACK_EVENTS.indexOf(stackEvent) === -1) {
      throw new Error("Invalid event");
    }
    const result = await stackClient.track(stackEvent, {
      points: 10,
      account: address,
    });
    return Response.json(result, {
      status: 200,
    });
  } catch (err) {
    return Response.json(err, {
      status: 403,
    });
  }
};
