import { isNumber } from "lodash";

export class Env {
  public static get NEYNAR_API_KEY(): string {
    const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
    if (!NEYNAR_API_KEY) {
      throw new Error("NEYNAR_API_KEY is not defined");
    }
    return NEYNAR_API_KEY;
  }

  public static get STACK_API_KEY(): string {
    const STACK_API_KEY = process.env.STACK_API_KEY ?? "";
    if (!STACK_API_KEY) {
      throw new Error("STACK_API_KEY is not defined");
    }
    return STACK_API_KEY;
  }
  public static get STACK_POINT_SYSTEM_ID(): number {
    const STACK_POINT_SYSTEM_ID = process.env.STACK_POINT_SYSTEM_ID ?? "";
    if (!STACK_POINT_SYSTEM_ID) {
      throw new Error("STACK_POINT_SYSTEM_ID is not defined");
    }
    return parseInt(STACK_POINT_SYSTEM_ID, 10);
  }
}
