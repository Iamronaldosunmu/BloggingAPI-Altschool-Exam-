import express from "express";
import { User } from "../models/user.js";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;
  if (password !== confirm_password)
    return res.status(400).send("The passwords must match!");

  const user = new User({
    first_name,
    last_name,
    email,
    password,
  });

});

export default userRouter;
