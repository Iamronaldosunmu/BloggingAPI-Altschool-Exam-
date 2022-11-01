import express from "express";
const articleRouter = express.Router();

articleRouter.get("/", (req, res) => res.send("This route is working!"));

export default articleRouter;
