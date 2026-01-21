// backend/routes/authRoutes.js

const express = require("express");
const rateLimit = require("express-rate-limit");
const { 
  login, 
  signup, 
  logout,
  verifyEmail,
  handlePaymentSuccess,
  resendVerification
} = require("../controllers/authController");

const router = express.Router();

// 🛡️ Rate limiting for auth endpoints (5 attempts per 15 mins)
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: "Too many attempts, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail);
router.post("/payment-success", handlePaymentSuccess);
router.post("/resend-verification", authLimiter, resendVerification);

module.exports = router;