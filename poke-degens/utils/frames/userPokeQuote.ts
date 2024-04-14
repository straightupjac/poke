import { POKE_BOT_FID } from "../crypto";
import { neynarClient } from "../neynar/neynar";

export enum UserPokeQuotaStatus {
  UserCanPoke = "user-can-poke",
  UserOutOfPokes = "user-out-of-pokes",
  Error = "error",
}
export default async function userPokeQuota({ fid }: { fid: number }) {
  try {
    const { result } = await neynarClient.fetchAllCastsCreatedByUser(
      POKE_BOT_FID
    );
    const casts = result.casts;

    const pokesFromToday = casts.filter(
      (cast) =>
        new Date(cast.timestamp).toDateString() === new Date().toDateString() &&
        cast.mentionedProfiles[0].fid === fid
    );
    if (pokesFromToday.length >= 25) {
      return {
        status: UserPokeQuotaStatus.UserOutOfPokes,
        message: "You have reached your daily poke quota",
        pokesFromToday,
      };
    }
    return {
      status: UserPokeQuotaStatus.UserCanPoke,
      message: "You can poke",
      pokesFromToday,
      numberOfPokesFromToday: pokesFromToday.length,
    };
  } catch (err) {
    console.error(err);
    return {
      status: UserPokeQuotaStatus.Error,
      message: "Error fetching user poke quota",
    };
  }
}
