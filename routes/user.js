import express from "express";
import bcrypt from "bcrypt";
import { User, validateUser } from "../models/user.js";
import passport from "passport";
import { createNewUser, logUserIn } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  createNewUser
);

userRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  logUserIn
)

export default userRouter;
