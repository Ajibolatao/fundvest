import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  transactionId: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  principal: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  proposedTotalInterest: {
    type: Number,
    required: true,
  },
  proposedTotalAmount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
  dailyInterest: {
    type: Number,
  },
  currentInterest: {
    type: Number,
    // required: true,
  },
  currentAmount: {
    type: Number,
    // required: true,
  },
  todayDate: {
    type: Date,
  },
});

export default mongoose.model("Transaction", TransactionSchema);
