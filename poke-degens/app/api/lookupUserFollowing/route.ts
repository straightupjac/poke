import isString from "lodash/isString";
import { neynarClient } from "@/utils/neynar/neynar";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    if (!username || !isString(username))
      throw new Error("Address is required");

    const {
      result: { user },
    } = await neynarClient.lookupUserByUsername(username);

    console.log("lookupUserFollowing: ", user);
    const result = await neynarClient.fetchUserFollowing(user.fid);
    return Response.json(result, {
      status: 200,
    });
  } catch (err) {
    return Response.json(err, {
      status: 403,
    });
  }
};
