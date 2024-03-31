import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { Env } from "../envSetup";

export const neynarClient = new NeynarAPIClient(Env.NEYNAR_API_KEY);
