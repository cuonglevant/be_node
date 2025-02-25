import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema({
  name: String,
  description: String,
  nation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nation",
  },
});

const League = mongoose.model("League", leagueSchema);

export default League;
