const express = require("express");
const { login, signup,logout } = require("../controllers/authController");

const router = express.Router();

// ✅ Login route
router.post("/login", login);

// ✅ Signup route for new clients (CLIENT_ADMIN)
router.post("/signup", signup);
router.post("/logout", logout); 

module.exports = router;
