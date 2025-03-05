import mongoose from "mongoose";
import Team from "./team.model.js";
const LeagueStandingSchema = new mongoose.Schema({
  position: Number,
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
  },
  played: Number,
  won: Number,
  drawn: Number,
  lost: Number,
  gd: Number,
  points: Number,
});

const LeagueStanding = mongoose.model("LeagueStanding", LeagueStandingSchema);

export default LeagueStanding;
