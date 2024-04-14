import { FRAME_URL, POKE_BOT_FID } from "../crypto";
import { neynarClient } from "../neynar/neynar";

export default async function deleteFaultyPokes() {
  const { result } = await neynarClient.fetchAllCastsCreatedByUser(
    POKE_BOT_FID,
    {
      limit: 150,
    }
  );
  const casts = result.casts;
  const faultyPokes = casts.filter(
    (cast) => !cast.embeds.some((embed) => embed.url === FRAME_URL)
  );
  const faultyPokesCount = faultyPokes.length;
  return {
    faultyPokesCount,
    faultyPokes,
    totalCasts: casts.length,
  };
}
