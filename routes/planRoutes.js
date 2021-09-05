import express from "express";

const router = express.Router();

// IMPORT MIDDLEWARE
import middleware from "../middlewares/middleware.js";

// QUICKVEST
router.get("/quickvest", (req, res) => {
  res.render(`plans/quickvest`);
});

// REALVEST
router.get("/realvest", (req, res) => {
  res.render(`plans/realvest`);
});

// FUNDVEST
router.get("/fundvest", (req, res) => {
  res.render(`plans/fundvest`);
});

// module.exports = router;
export default router;
