const mongoose = require("mongoose");

const List = mongoose.model(
  "List",
  new mongoose.Schema({
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
  })
);
