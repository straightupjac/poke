import userPokeQuota from "@/utils/frames/userPokeQuote";

export const POST = async (req: Request) => {
  try {
    if (process.env.NODE_ENV !== "development") {
      return Response.json({ message: "Not allowed" }, { status: 403 });
    }
    const reqBody = await req.json();
    const { fid } = reqBody;

    const result = await userPokeQuota({ fid });

    return Response.json({
      message: "User poke quota fetched successfully",
      result,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ err }, { status: 403 });
  }
};
