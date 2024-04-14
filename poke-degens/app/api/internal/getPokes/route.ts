import { POKE_BOT_FID } from "@/utils/crypto";
import { neynarClient } from "@/utils/neynar/neynar";

export const GET = async (req: Request) => {
  try {
    if (process.env.NODE_ENV !== "development") {
      return Response.json({ message: "Not allowed" }, { status: 403 });
    }

    const { result } = await neynarClient.fetchAllCastsCreatedByUser(
      POKE_BOT_FID,
      {
        limit: 150,
      }
    );

    const casts = result.casts.map((cast) => ({
      hash: cast.hash,
      embeds: cast.embeds,
      text: cast.text,
      mentions: cast.mentionedProfiles.map((profile) => ({
        fid: profile.fid,
        username: profile.username,
      })),
      timestamp: cast.timestamp,
    }));

    return Response.json({
      casts,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ err }, { status: 403 });
  }
};
