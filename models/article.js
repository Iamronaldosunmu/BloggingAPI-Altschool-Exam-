import mongoose from "mongoose";
import Joi from "joi";

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
      default: 0,
    },
    reading_time: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const validateArticle = (payload) => {
  const schema = Joi.object({
    author: Joi.string().min(3).max(40),
    description: Joi.string().min(3).max(255).required(),
    body: Joi.string().min(10).required(),
    title: Joi.string().min(3).max(255).required(),
    author: Joi.string().min(3).max(50).required(),
    tags: Joi.array().items(Joi.string().min(2)),
  });
  return schema.validate(payload);
};

export const Article = mongoose.model("Article", articleSchema);
