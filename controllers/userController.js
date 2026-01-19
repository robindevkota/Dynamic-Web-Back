const User = require("../models/User");

// ✅ Get all users (SUPER_ADMIN only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get users by organization (optional)
exports.getUsersByOrganization = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    if (!orgId) return res.status(400).json({ error: "Organization ID required" });

    const users = await User.find({ organizationId: orgId }).select("-password");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users by org:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
