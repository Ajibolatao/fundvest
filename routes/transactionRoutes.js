import express from "express";

const router = express.Router();

// Import models
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// Import middleware
import middleware from "../middlewares/middleware.js";

// ****** ROUTES **********

// TRANSACTION
router.get("/transaction", (req, res) => {
  User.findOne({ email: req.user.email })
    .populate("transactions")
    .then((user) => {
      // Update transaction details
      
      user.transactions.forEach(transaction => {
        const todaysDate = new Date();
        
        const secInDays = 60 * 60 * 24;

        const passedTimeinSec =
          (todaysDate.getTime() - transaction.startDate.getTime()) / 1000;

        // Passed Days
        const passedDays = passedTimeinSec / secInDays;

        // Current Interest
        const currentInterest = transaction.dailyInterest * passedDays;

        // Current Amount
        const currentAmount = transaction.principal + currentInterest;

        
        Transaction.findOneAndUpdate(
          { transactionId: transaction.transactionId },
          { currentInterest, currentAmount }
        )
          .then((t) => res.render("app/transaction", { transactions: user.transactions }))
          .catch((err) => console.log(err));

      })
      
      

    })
    .catch((err) => console.log(err));
});

// PURCHASE PLAN
router.post("/purchase-plan", (req, res) => {
  let { principal, duration, rate } = req.body;
  principal = Number(principal);
  duration = Number(duration);
  rate = Number(rate);

  // Find all transactions
  Transaction.find()
    .sort({ transactionId: -1 })
    .then((transactions) => {
      // Create unique transaction ID
      const transactionId = transactions[0].transactionId + 1;

      //   Get start date
      const startDate = new Date();

      //   Get due date
      const dueDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + duration,
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds()
      );

      // Set Status to active
      const status = "Active";

      // Proposed total interest
      const proposedTotalInterest = (principal * rate * (duration / 12)) / 100;

      // Proposed total amount
      const proposedTotalAmount = principal + proposedTotalInterest;

      // Get Daily interest
      const timeDiffInSec = (dueDate.getTime() - startDate.getTime()) / 1000;
      const secInDays = 60 * 60 * 24;
      const daysDiff = timeDiffInSec / secInDays;
      const dailyInterest = proposedTotalInterest / daysDiff;

      // Find a user
      User.findOne({ email: req.user.email })
        .then((user) => {
          // Create a transaction
          Transaction.create({
            transactionId,
            status,
            principal,
            duration,
            startDate,
            proposedTotalInterest,
            proposedTotalAmount,
            dueDate,
            dailyInterest,
          })
            .then((transaction) => {
              user.transactions.push(transaction);
              user.save();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      res.render("messages/purchase__plan");
    })
    .catch((err) => console.log(err));
});

// module.exports = router;
export default router;
