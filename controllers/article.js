import { isValidObjectId } from "mongoose";
import { Article, validateArticle } from "../models/article.js";
import readingTime from "reading-time";

export const getAllPublishedArticles = async (req, res) => {
  const publishedArticles = await Article.find({ state: "published" });
  res.send(publishedArticles);
};

export const getAPublishedArticle = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "This ID is not valid!" });

  const article = await Article.findById(id);
  console.log(article);
  if (!article)
    return res.status(404).json({ message: "This article does not exist!" });

  if (article && article.state !== "published")
    return res
      .status(400)
      .json({ message: "This article has not yet been published!" });

  return res.status(200).json(article);
};

export const createAnArticle = async (req, res) => {
  // Validate the request body
  const { error } = validateArticle(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if title is taken
  const title_taken = await Article.findOne({ title: req.body.title });
  if (title_taken)
    return res.status(400).json({ message: "This title is already taken!" });
  // Get the reading time of the body
  const reading_time = readingTime(req.body.body);

  // Create the article
  const article = new Article({
    ...req.body,
    reading_time: reading_time.text,
  });

  const result = await article.save();

  return res.send(result);
};
