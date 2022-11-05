import { isValidObjectId } from "mongoose";
import { Article, validateArticle } from "../models/article.js";
import readingTime from "reading-time";
import { User } from "../models/user.js";
import { calculateReadingTime } from "../utils/CalculateReadingTime.js";

export const getAllPublishedArticles = async (req, res) => {
  console.log(req.query)
  const authorQuery = req.query.author
    ? {
        $or: [
          { "author.first_name": new RegExp(req.query.author, "i") },
          { "author.last_name": new RegExp(req.query.author, "i") },
        ],
      }
    : {};
  const titleQuery = req.query.title
    ? { title: new RegExp(req.query.title, "i") }
    : {};
  const tagQuery = req.query.tag
    ? { tags: new RegExp(req.query.tag, "i") }
    : {};
  const pageLimit = 20;
  let publishedArticles = await Article.find({
    state: "published",
    ...authorQuery,
    ...tagQuery,
    ...titleQuery,
  })
    .limit(pageLimit)
    .skip(req.query.page ? (req.query.page - 1) * pageLimit : 0)
    .sort({
      read_count: req.query.sortBy == "read_count" ? -1 : 0,
      createdAt: req.query.sortBy == "timestamp" ? -1 : 0,
    });
  
  // publishedArticles = req.query.sortBy == "reading_time" ? publishedArticles.sort((article1, article2) => {
  //   return article1.reading_time.reading_time_in_minutes - article2.reading_time.reading_time_in_minutes
  // }) : publishedArticles

  return res.send(publishedArticles);
};

export const getAPublishedArticle = async (req, res) => {
  const { id } = req.params;

  // Check if it is a valid mongoose object id
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "This ID is not valid!" });

  const article = await Article.findOne({ _id: id, state: "published" });
  if (!article) return res.sendStatus(404);

  // Increment the read count of the article
  article.read_count = article.read_count + 1;
  const result = await article.save();

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

  const author = await User.findById(req.user).select(
    "_id first_name last_name email"
  );

  // Get the reading time of the body
  const reading_time = calculateReadingTime(req.body.body);

  // Create the article
  const article = new Article({
    ...req.body,
    author,
    reading_time,
  });

  const result = await article.save();

  return res.send({
    article: result,
    message: "Article created successfully!",
  });
};

export const publishAnArticle = async (req, res) => {
  const { id } = req.params;

  // Check if it is a valid mongoose object id
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "This id is not valid" });

  // Check if the article exists
  const article = await Article.findById(id);
  if (!article)
    return res.status(404).json({ message: "This article does not exist!" });

  // Check if the user is the author
  const author = article.author._id;

  if (req.user._id !== author.toString())
    return res.status(401).json({
      message: "Unauthorized, You are not the author of this article",
    });

  // Check if the article has been published
  if (article.isPublished())
    return res
      .status(400)
      .json({ message: "This article has already been published!" });

  article.state = "published";
  const result = await article.save();

  return res.status(200).json({ message: "Article published successfully!" });
};

export const editArticle = async (req, res) => {
  const { id } = req.params;

  // Check if it is a valid mongoose object id
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "This id is not valid!" });

  // Check if the article exists
  const article = await Article.findById(id);
  if (!article)
    return res.status(404).json({ message: "This article does not exist!" });

  // Check if the user is the author
  const author = article.author._id;

  if (req.user._id !== author.toString())
    return res.status(401).json({
      message: "Unauthorized, You are not the author of this article",
    });

  // Validate the data from the user
  const { error } = validateArticle(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Update the post
  const { title, description, body } = req.body;
  article.title = title;
  article.description = description;
  article.body = body;

  const result = await article.save();

  return res.status(200).json({
    message: "The article has been updated successfully!",
    article: result,
  });
};

export const deleteAnArticle = async (req, res) => {
  const { id } = req.params;

  // Check if it is a valid mongoose object id
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "This id is not valid!" });

  // Check if the article exists
  const article = await Article.findById(id);
  if (!article)
    return res.status(404).json({ message: "This article does not exist!" });

  // Check if the user is the author
  const author = await User.findById(article.author._id);
  console.log(author);

  if (req.user._id !== author._id.toString())
    return res.status(401).json({
      message: "Unauthorized, You are not the author of this article",
    });

  const deleted_article = await Article.findByIdAndDelete(id);
  return res.status(202).json({
    message: "This article has been deleted successfully!",
    deleted_article,
  });
};

export const getArticlesByAuthor = async (req, res) => {
  const pageLimit = 10;
  const query = req.query.state ? { state: req.query.state } : {};
  const articles = await Article.find({
    "author._id": req.user._id,
    ...query,
  })
    // Implementation of filtering and pagination
    .limit(pageLimit)
    .skip(req.query.page ? (req.query.page - 1) * pageLimit : 0);
  console.log(articles);
  if (!articles)
    return res
      .status(404)
      .json({ message: "This author has not published any articles!" });

  return res.status(200).json({ articles });
};
