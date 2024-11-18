const mongoose = require("mongoose");

const Card = mongoose.model(
  "Card",
  new mongoose.Schema({
    cardID: String,
    cardName: String,
    cardDescription: String,
    listID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  })
);
