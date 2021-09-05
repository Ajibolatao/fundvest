import express from "express";

const router = express.Router();

// IMPORT MODELS
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// IMPORT MIDDLEWARE
import middleware from "../middlewares/middleware.js";

// Dashboard
router.get("/dashboard", middleware.isLoggedIn, (req, res) => {
  res.render(`app/dashboard`);
});

// Profile
router.get("/profile", middleware.isLoggedIn, (req, res) => {
  User.findOne({ email: req.user.email })
    .populate("transactions")
    .exec()
    .then((user) => {
      res.render(`app/profile`);
    })
    .catch((err) => console.log(err));
});

// Investment
router.get("/investment", middleware.isLoggedIn, (req, res) => {
  res.render(`app/investment`);
});


export default router;
