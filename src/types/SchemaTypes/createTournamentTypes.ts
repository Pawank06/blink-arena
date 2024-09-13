import { Document, Model } from "mongoose";

export interface ITournament extends Document {
  organizationName: string;
  email: string;
  image: string;
  description: string;
  prizePool: string;
  date: string;
  location: string;
  totalTeamMembers: number;
  joinFees: number;
  joinFeesType: string;
}

export interface ITournamentModel extends Model<ITournament> {}
