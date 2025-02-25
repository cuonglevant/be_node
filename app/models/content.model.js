import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  slug: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    nullables: false,
  },
  publishDate: Date,
});

const contentSchema = new mongoose.Schema({
  title: String,
  content: String,
  publishDate: Date,
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      nullables: false,
    },
  ],
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      nullables: true,
    },
  ],
  comment: [commentSchema],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    nullables: false,
  },
  numOfViews: Number,
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
