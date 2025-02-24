import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema({
  name: String,
  description: String,
  nation: String,
});

const League = mongoose.model("League", leagueSchema);

export default League;
