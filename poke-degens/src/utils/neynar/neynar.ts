import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { Env } from "../envSetup";

export const neynarClient = new NeynarAPIClient(Env.NEYNAR_API_KEY);

// TODO(jac): change to the correct channel
export const pokeChannelUrl =
  "chain://eip155:1/erc721:0xfd8427165df67df6d7fd689ae67c8ebf56d9ca61";

export const POKE_CHANNEL_ID = "poke";
