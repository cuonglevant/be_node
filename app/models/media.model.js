import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  mediaCaption: String,
  mediaType: String,
  mediaURL: String,
});

const Media = mongoose.model("Media", mediaSchema);

export default Media;
