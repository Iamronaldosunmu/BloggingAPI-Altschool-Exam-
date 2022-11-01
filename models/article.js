import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    read_count: {
      type: Number,
      required: true,
    },
    reading_time: {
      type: String,
    },
    tags: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Article = mongoose.model("Article", articleSchema);
