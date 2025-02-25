import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  position: String,
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
  },
  nation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nation",
  },
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
