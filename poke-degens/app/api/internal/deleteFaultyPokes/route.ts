import { Env } from "@/utils/envSetup";
import deleteFaultyPokes from "@/utils/frames/deleteFaultyPokes";
import { neynarClient } from "@/utils/neynar/neynar";

export const POST = async (req: Request) => {
  try {
    if (process.env.NODE_ENV !== "development") {
      return Response.json({ message: "Not allowed" }, { status: 403 });
    }
    const { faultyPokes, faultyPokesCount } = await deleteFaultyPokes();

    if (faultyPokesCount === 0) {
      return Response.json({
        message: "No faulty pokes found",
        faultyPokes,
        faultyPokesCount,
      });
    }

    await Promise.all(
      faultyPokes.map((cast) => {
        return neynarClient.deleteCast(Env.NEYNAR_SIGNER_UUID, cast.hash);
      })
    );

    return Response.json({
      message: "Faulty pokes deleted successfully",
      faultyPokes,
      delatedCasts: faultyPokesCount,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ err }, { status: 403 });
  }
};
