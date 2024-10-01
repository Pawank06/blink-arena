import { connectToDatabase } from "@/app/(mongodb)/connectdb";
import createTournamentSchema from "@/app/(mongodb)/schema/createTournamentSchema";
import uploadImage from "../cloudinary/route";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const formData = await req.formData();

    // Extract fields from formData
    const organizationName = formData.get("organizationName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const prizePool = formData.get("prizePool")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const time = formData.get("time")?.toString() || "";
    const location = formData.get("location")?.toString() || "";
    const totalTeamMembers = Number(formData.get("totalTeamMembers") || 0);
    const joinFees = Number(formData.get("joinFees") || 0);
    const joinFeesType = formData.get("joinFeesType")?.toString() || "";

    // Handle image upload
    const image = formData.get("image") as File;
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImage(image, "tournament");
    }

    // Create tournament data
    const data = new createTournamentSchema({
      tournamentId: crypto.randomUUID(),
      organizationName,
      email,
      image: imageUrl,
      description,
      prizePool,
      date,
      time,
      location,
      totalTeamMembers,
      joinFees,
      joinFeesType,
    });

    // Save to the database
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
