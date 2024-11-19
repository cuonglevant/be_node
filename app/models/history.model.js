import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  historyID: String,
  historyDescription: String,
  cardID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  userID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const History = mongoose.model("History", historySchema);

export default History;
