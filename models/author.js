import mongoose from "mongoose";

export const authorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
    min: 3,
  },
  last_name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    min: 3,
  },
});
