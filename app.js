import express from "express";
import connectToDb from "./startup/db.js";
import dotenv from "dotenv";
import useRoutesFor from "./startup/routes.js";
import cors from "cors";
import logger from "morgan";

const app = express();
const port = process.env.PORT || 4000;

dotenv.config();
// Middleware functions
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
useRoutesFor(app);
app.listen(port, () =>
  console.log(`The server is now running on port ${port}...`)
);
connectToDb();
