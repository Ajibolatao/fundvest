import mongoose from "mongoose";

import Transaction from "./Transaction.js";

const UserSchema = new mongoose.Schema({
  customerId: {
    type: Number,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  tel: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    required: true,
  },
  transactions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
    },
  ],
});

export default mongoose.model("User", UserSchema);
