import { ITournament } from "@/types/SchemaTypes/createTournamentTypes";
import mongoose from "mongoose";

const createTournamentSchema = new mongoose.Schema<ITournament>({
  organizationName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prizePool: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  totalTeamMembers: {
    type: Number,
    required: true,
  },
  joinFees: {
    type: Number,
    required: true,
  },
  joinFeesType: {
    type: String,
    required: true,
  },
});

export default mongoose.models.createTournamentSchema ||
  mongoose.model("createTournamentSchema", createTournamentSchema);
