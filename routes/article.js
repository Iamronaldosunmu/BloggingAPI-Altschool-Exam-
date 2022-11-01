import express from "express";
import {
  createAnArticle,
  getAllPublishedArticles,
  getAPublishedArticle,
} from "../controllers/article.js";
const articleRouter = express.Router();

articleRouter.get("/", getAllPublishedArticles);
articleRouter.post("/", createAnArticle);
articleRouter.get("/:id", getAPublishedArticle)

export default articleRouter;
