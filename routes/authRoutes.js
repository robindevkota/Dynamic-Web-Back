// backend/routes/authRoutes.js

const express = require("express");
const { 
  login, 
  signup, 
  logout,
  verifyEmail,
  handlePaymentSuccess,
  resendVerification
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail); // ✅ New
router.post("/payment-success", handlePaymentSuccess); // ✅ New (for Stripe webhook)
router.post("/resend-verification", resendVerification); // ✅ New

module.exports = router;