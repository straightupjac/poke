import { StackClient } from "@stackso/js-core";
import { Env } from "./envSetup";

export const stackClient = new StackClient({
  apiKey: Env.STACK_API_KEY,
  pointSystemId: Env.STACK_POINT_SYSTEM_ID,
});

export const STACK_EVENTS = ["user_poke"];
