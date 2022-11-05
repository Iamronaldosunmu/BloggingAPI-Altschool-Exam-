import express from "express";
import connectToDb from "./startup/db.js";
import useRoutesFor from "./startup/routes.js";
import cors from "cors";
import logger from "morgan";
import app from "./startup/server.js";

const port = process.env.PORT || 4000;

import "./controllers/user.js";
// Middleware functions
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
useRoutesFor(app);
app.listen(port, () =>
  console.log(`The server is now running on port ${port}...`)
);
connectToDb();

export default app;
