import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
  },
  points: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    nullable: true,
  },
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
  player: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      nullable: false,
    },
  ],
  nation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nation",
  },
  flag: String,
  shortName: String,
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
