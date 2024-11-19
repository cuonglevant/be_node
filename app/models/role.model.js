import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "user",
  },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
