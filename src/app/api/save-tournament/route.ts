import { connectToDatabase } from "@/app/(mongodb)/connectdb";
import createTournamentSchema from "@/app/(mongodb)/schema/createTournamentSchema";

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const {
      organizationName,
      email,
      image,
      description,
      prizePool,
      date,
      time,
      location,
      totalTeamMembers,
      joinFees,
      joinFeesType,
    } = await req.json();

    const data = new createTournamentSchema({
      tournamentId: crypto.randomUUID(),
      organizationName,
      email,
      image,
      description,
      prizePool,
      date,
      time,
      location,
      totalTeamMembers,
      joinFees,
      joinFeesType,
    });
    await data.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Tournament created successfully",
        data,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error || "Something went wrong",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
