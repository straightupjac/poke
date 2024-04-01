import { neynarClient } from "@/utils/neynar/neynar";
import isString from "lodash/isString";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    if (!address || !isString(address)) throw new Error("Address is required");
    const result = await neynarClient.fetchBulkUsersByEthereumAddress([
      address,
    ]);
    const user = result[address.toLowerCase()][0];
    return Response.json(user);
  } catch (err) {
    return Response.json({ error: err }, { status: 400 });
  }
}
