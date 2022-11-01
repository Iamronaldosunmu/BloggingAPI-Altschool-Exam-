import mongoose from "mongoose";

export default function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to the DB..."))
    .catch((err) => {
      console.error(err.message);
    });
}