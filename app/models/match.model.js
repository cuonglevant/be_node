import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  date: Date,
  slug: String,
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
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
  score: {
    home: Number,
    away: Number,
  },
  status: {
    type: String,
    enum: ["pending", "playing", "completed"],
    default: "pending",
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Match = mongoose.model("Match", matchSchema);

export default Match;
