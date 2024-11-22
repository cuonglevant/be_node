import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  boardID: String,
  boardName: String,
  boardOwner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  listID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      nullables: true,
    },
  ],
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
