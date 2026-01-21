const Organization = require("../models/Organization");
const User = require("../models/User");
const PageConfig = require("../models/PageConfig");

exports.getDashboardStats = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { role, organizationId } = req.user;

    let stats = {};

    if (role === "SUPER_ADMIN") {
      // ────────────────────────────────────────────────
      // Super Admin: platform-wide overview
      // ────────────────────────────────────────────────
      const totalOrgs = await Organization.countDocuments({
        status: { $nin: ["DELETED"] },
      });

      const totalUsers = await User.countDocuments({
        status: { $nin: ["DELETED"] },
      });

      const totalProjects = await PageConfig.countDocuments({
        status: { $ne: "Deleted" },
        isTemplate: false, // usually exclude templates
      });

      stats = {
        totalOrganizations: totalOrgs,
        totalUsers,
        totalProjects,
        // Optional extras you might want later:
        // activeSubscriptions: await Organization.countDocuments({ "billing.status": "ACTIVE" }),
        // pendingPayments: await Organization.countDocuments({ status: "PENDING_PAYMENT" }),
      };
    } 
    else if (role === "CLIENT_ADMIN" || role === "DEVELOPER") {
      // ────────────────────────────────────────────────
      // Org-level stats (same for both roles in most cases)
      // ────────────────────────────────────────────────
      if (!organizationId) {
        return res.status(400).json({ error: "No organization associated with user" });
      }

      const org = await Organization.findById(organizationId).lean();

      if (!org) {
        return res.status(404).json({ error: "Organization not found" });
      }

      const totalProjects = await PageConfig.countDocuments({
        organizationId,
        status: { $ne: "Deleted" },
        isTemplate: false,
      });

      const totalUsers = await User.countDocuments({
        organizationId,
        status: { $nin: ["DELETED", "PENDING_VERIFICATION"] }, // adjust filter as needed
      });

      stats = {
        organizationName: org.name,
        pricingPlan: org.pricingPlan,
        currentProjects: org.currentProjects,     // from denormalized field
        maxProjects: org.maxProjects,
        currentUsers: org.currentUsers,           // from denormalized field
        maxUsers: org.maxUsers,
        // calculated / real-time values (more reliable than denormalized)
        realTotalProjects: totalProjects,
        realTotalUsers: totalUsers,
      };

      // Developers usually don't need user count → but it's harmless to include
      if (role === "DEVELOPER") {
        delete stats.currentUsers;
        delete stats.maxUsers;
        delete stats.realTotalUsers;
      }
    } 
    else {
      return res.status(403).json({ error: "Role not allowed to view stats" });
    }

    return res.json({
      success: true,
      role,
      stats,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return res.status(500).json({ error: "Failed to load dashboard statistics" });
  }
};