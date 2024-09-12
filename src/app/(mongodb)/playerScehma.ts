import mongoose, { Schema } from "mongoose";

const playerSchema: Schema = new Schema({
  playerId :{type:String,required:true},
  tournamentId :{type:String,required:true},
  playerName :{type:String,required:true},
  playerEmail :{type:String,required:true},
  playerPubKey :{type:String,required:true},
  teamType :{type:String,required:true},
  teamMembers :{type:String,required:true},
});

// Check if the model is already compiled
const PlayerSchema =
  mongoose.models.playerSchema || mongoose.model("playerSchema", playerSchema);

export default PlayerSchema;
