import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema({
  name: String,
  description: String,
  slug: String,
  nation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nation",
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
});

const League = mongoose.model("League", leagueSchema);

export default League;
