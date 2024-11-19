import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  listID: String,
  listName: String,
  boardID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
  cardID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

const List = mongoose.model("List", listSchema);

export default List;
