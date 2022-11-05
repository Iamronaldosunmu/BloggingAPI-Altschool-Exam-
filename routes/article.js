import express from "express";
import {
  createAnArticle,
  deleteAnArticle,
  editArticle,
  getAllPublishedArticles,
  getAPublishedArticle,
  getArticlesByAuthor,
  publishAnArticle,
} from "../controllers/article.js";
import passport from "passport";
const articleRouter = express.Router();

articleRouter.get("/", getAllPublishedArticles);

articleRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createAnArticle
);

articleRouter.get("/:id", getAPublishedArticle);

articleRouter.post(
  "/:id/publish",
  passport.authenticate("jwt", { session: false }),
  publishAnArticle
);

articleRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  editArticle
);

articleRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteAnArticle
);

articleRouter.get(
  "/authors/my_articles",
  passport.authenticate("jwt", { session: false }),
  getArticlesByAuthor
);

export default articleRouter;
