const mongoose = require("mongoose");

const Board = mongoose.model(
  "Board",
  new mongoose.Schema({
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
      },
    ],
  })
);
