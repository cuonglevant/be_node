const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userID: String,
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    boardID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        default: null,
      },
    ],
  })
);

module.exports = User;
