import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: String,
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      nullables: true,
    },
  ],
  boardID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      nullables: true,
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
