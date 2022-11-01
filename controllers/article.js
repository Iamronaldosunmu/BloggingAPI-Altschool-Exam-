import { isValidObjectId } from "mongoose";
import { Article, validateArticle } from "../models/article.js";

export const getAllPublishedArticles = async (req, res) => {
  const publishedArticles = await Article.find({ state: "published" });
  res.send(publishedArticles);
};

export const getAPublishedArticle = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "This ID is not valid!" });

  const article = await Article.findById(id);
  if (!article)
    return res.status(404).json({ message: "This article does not exist!" });

  if (article && article.state !== "published")
    return res.status("This article has not yet been published!");

  return res.status(200).json(article);
};

export const createAnArticle = async (req, res) => {
  // Validate the request body
  const { error } = validateArticle(req.body);
  console.log(error);
  res.send(error);
};
