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

  public static get NEYNAR_SIGNER_UUID(): string {
    const NEYNAR_SIGNER_UUID = process.env.NEYNAR_SIGNER_UUID;
    if (!NEYNAR_SIGNER_UUID) {
      throw new Error("NEYNAR_SIGNER_UUID is not defined");
    }
    return NEYNAR_SIGNER_UUID;
  }

  public static get NEXT_PUBLIC_URL(): string {
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
    if (!NEXT_PUBLIC_URL) {
      throw new Error("NEXT_PUBLIC_URL is not defined");
    }
    return NEXT_PUBLIC_URL;
  }
}
