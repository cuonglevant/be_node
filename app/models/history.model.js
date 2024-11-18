const mongoose = require("mongoose");

const History = mongoose.model(
  "History",
  new mongoose.Schema({
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
  })
);
