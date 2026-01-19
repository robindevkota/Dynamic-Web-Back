const express = require("express");
const { getAllUsers, getUsersByOrganization } = require("../controllers/userController");
const { verifySuperAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Only SUPER_ADMIN can fetch all users
router.get("/", verifySuperAdmin, getAllUsers);

// Optional: fetch users by org
router.get("/organization/:orgId", verifySuperAdmin, getUsersByOrganization);

module.exports = router;
