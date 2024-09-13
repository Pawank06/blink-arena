import { connectToDatabase } from "@/app/(mongodb)/connectdb";
import Player from "@/app/(mongodb)/schema/playerScehma";
import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  CompletedAction,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";


export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" }, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req:Request)=>{
    await connectToDatabase();
    try{
    const body = await req.json();
    const url = new URL(req.url);
    const playerPubKey = body.account;
    const playerName = url.searchParams.get("playerName") ?? "";
    const playerEmail = url.searchParams.get("playerEmail") ?? "";
    const teamType = url.searchParams.get("teamType") ?? "";
    const teamMembers = url.searchParams.get("teamMembers") ?? "";
    const tournamentId = url.searchParams.get("tournamentId") ?? "";
    const playerId = crypto.randomUUID();

    const newPlayer = new Player({
      playerId,
      tournamentId,
      playerName,
      playerEmail,
      playerPubKey,
      teamType,
      teamMembers,
    })

    await newPlayer.save();

    const payload: CompletedAction = {
        type: "completed",
        title: "Registration Successful",
        icon: 'http://localhost:3000/logo.png',
        label: "Completed",
        description: `You have successfully joined the tournament`,
      };

      

      return new Response(JSON.stringify(payload), {
        headers: ACTIONS_CORS_HEADERS,
      });
  } catch (err) {
    console.error("General error:", err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return new Response(JSON.stringify(actionError), {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
}