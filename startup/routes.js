import articleRouter from "../routes/article.js";
import userRouter from "../routes/user.js";

export default function (app) {
  app.use("/user", userRouter);
  app.use("/article", articleRouter)
}
