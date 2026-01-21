// backend/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const authMiddleware = require("../middleware/authMiddleware");

// 🛡️ Rate limiting for invitations (10 per hour)
const inviteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: "Invitation limit reached. Please try again in an hour." }
});

const {
  getAllUsers,
  getMyOrganizationUsers,
  inviteDeveloper,
  acceptInvitation,
  getCurrentUser,
  removeUser
} = require("../controllers/userController");

// ✅ Get current user (all roles)
router.get("/me", authMiddleware, getCurrentUser);

// ✅ Get all users (SUPER_ADMIN only)
router.get("/", authMiddleware, getAllUsers);

// ✅ Get users in my organization (CLIENT_ADMIN)
router.get("/my-organization", authMiddleware, getMyOrganizationUsers);

// ✅ Invite developer (CLIENT_ADMIN)
router.post("/invite", authMiddleware, inviteLimiter, inviteDeveloper);

// ✅ Accept invitation (public - no auth)
router.post("/accept-invitation", acceptInvitation);

// ✅ Remove user (CLIENT_ADMIN)
router.delete("/:userId", authMiddleware, removeUser);

module.exports = router;