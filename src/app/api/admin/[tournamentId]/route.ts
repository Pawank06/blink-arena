import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { tournamentId: string; blinkId: string } }
) {
  const { tournamentId, blinkId } = params;

  return NextResponse.json({
    message: "Tournament and Blink data retrieved successfully",
    tournamentId,
    blinkId,
  });
}
