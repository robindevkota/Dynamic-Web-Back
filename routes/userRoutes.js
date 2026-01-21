// backend/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
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
router.post("/invite", authMiddleware, inviteDeveloper);

// ✅ Accept invitation (public - no auth)
router.post("/accept-invitation", acceptInvitation);

// ✅ Remove user (CLIENT_ADMIN)
router.delete("/:userId", authMiddleware, removeUser);

module.exports = router;