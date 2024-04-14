import isString from "lodash/isString";
import { neynarClient, POKE_CHANNEL_ID } from "../neynar/neynar";
import { Env } from "../envSetup";
import { FRAME_URL } from "../crypto";
import { stackClient, StackEvent } from "../stacks";
import userPokeQuota, { UserPokeQuotaStatus } from "./userPokeQuote";

export enum PokeStatus {
  Success = "success",
  OutOfDailyPokeQuota = "out-of-poke-quota",
  UserToPokeNotFound = "user-to-poke-not-found",
  Error = "error",
}

export default async function poke({
  fid,
  castId,
  usernameToPoke,
}: {
  fid?: number;
  castId?: {
    fid: number;
    hash: string;
  };
  usernameToPoke?: string;
}): Promise<{
  status: PokeStatus;
  message: string;
}> {
  try {
    if (!fid) throw new Error("fid is required");
    if (!castId) throw new Error("castId is required");
    if (!usernameToPoke || !isString(usernameToPoke))
      throw new Error("usernameToPoke is required");

    const pokeQuota = await userPokeQuota({ fid });
    if (pokeQuota.status === UserPokeQuotaStatus.UserOutOfPokes) {
      return {
        status: PokeStatus.OutOfDailyPokeQuota,
        message: "You have reached your daily poke quota",
      };
    }
    if (pokeQuota.status === UserPokeQuotaStatus.Error) {
      return {
        status: PokeStatus.Error,
        message: "Error fetching user poke quota",
      };
    }

    const pokeUser = (await neynarClient.fetchBulkUsers([fid])).users[0];
    const fromUsername = pokeUser.username;

    const pokeUserAddress = pokeUser.verified_addresses.eth_addresses.length
      ? pokeUser.verified_addresses.eth_addresses[0]
      : pokeUser.custody_address;

    let userToPoke = null;
    try {
      const result = await neynarClient.lookupUserByUsername(
        usernameToPoke.toLowerCase()
      );
      userToPoke = result.result.user;
      if (!userToPoke)
        return {
          status: PokeStatus.UserToPokeNotFound,
          message: "Error looking up user to poke",
        };
    } catch (err) {
      return {
        status: PokeStatus.UserToPokeNotFound,
        message: "Error looking up user to poke",
      };
    }

    /** publish poke cast on warpcast */
    await neynarClient.publishCast(
      Env.NEYNAR_SIGNER_UUID,
      `@${fromUsername} poked @${usernameToPoke}`,
      {
        embeds: [
          {
            url: FRAME_URL,
          },
        ],
        channelId: POKE_CHANNEL_ID,
      }
    );

    /** register poke on leaderboard */
    await stackClient.track(StackEvent.user_poke, {
      points: 10,
      account: pokeUserAddress,
    });

    return {
      status: PokeStatus.Success,
      message: "poke your degen frens 👉",
    };
  } catch (err) {
    console.error(err);
    return {
      status: PokeStatus.Error,
      message: "Error poking your degen frens",
    };
  }
}
