import mongoose from "mongoose";

const nationSchema = new mongoose.Schema({
  name: String,
  flag: String,
  slug: String,
  league: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
    },
  ],
});

const Nation = mongoose.model("Nation", nationSchema);

export default Nation;
