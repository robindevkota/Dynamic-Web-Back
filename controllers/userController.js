// backend/controllers/userController.js

const User = require("../models/User");
const Organization = require("../models/Organization");
const crypto = require("crypto");
const { sendDeveloperInvitation } = require("../utils/emailService");

// ✅ Get all users (SUPER_ADMIN only)
// SUPER_ADMIN: sees only platform roles (no END_USER)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: "Forbidden: Super admin only" });
    }

    const users = await User.find({
      role: { $in: ['SUPER_ADMIN', 'CLIENT_ADMIN', 'DEVELOPER', 'END_USER_ADMIN'] }
    })
      .populate('organizationId', 'name')
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organizationName: user.organizationId?.name,
        status: user.status,
        createdAt: user.createdAt
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Org-level user list – different view per role
exports.getMyOrganizationUsers = async (req, res) => {
  try {
    const { organizationId, role } = req.user;

    let query = { organizationId };

    if (role === 'CLIENT_ADMIN') {
      // Sees only DEVELOPER + END_USER_ADMIN (NOT customers)
      query.role = { $in: ['DEVELOPER', 'END_USER_ADMIN'] };
    } else if (role === 'END_USER_ADMIN') {
      // Sees only END_USER (customers)
      query.role = 'END_USER';
    } else if (role === 'DEVELOPER') {
      // Developers see no user list (or only other devs if you want)
      return res.status(403).json({ error: "No access to user list" });
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get users in my organization (CLIENT_ADMIN only)


// ✅ Invite Developer (CLIENT_ADMIN only)
exports.inviteDeveloper = async (req, res) => {
  try {
    const { email, firstName, lastName, assignedProjects } = req.body;
    const { organizationId, userId, role } = req.user;

    // Check if user is CLIENT_ADMIN
    if (role !== 'CLIENT_ADMIN') {
      return res.status(403).json({ error: "Only organization admins can invite developers" });
    }

    // Validate input
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Check organization limits
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    if (organization.currentUsers >= organization.maxUsers) {
      return res.status(400).json({ 
        error: `User limit reached (${organization.maxUsers}). Please upgrade your plan.` 
      });
    }

    // Generate invitation token
    const invitationToken = crypto.randomBytes(32).toString('hex');
    const invitationExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Create temporary password (will be changed by developer)
    const tempPassword = crypto.randomBytes(16).toString('hex');
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    // Create developer user (PENDING status until they accept)
    const developer = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: firstName || "",
      lastName: lastName || "",
      role: "DEVELOPER",
      organizationId,
      invitedBy: userId,
      invitationToken,
      invitationExpires,
      status: "PENDING_VERIFICATION", // Will be ACTIVE when they set password
      assignedProjects: assignedProjects || []
    });

    // Increment organization user count
    organization.currentUsers += 1;
    await organization.save();

    // Send invitation email
    const invitationUrl = `${process.env.FRONTEND_URL}/accept-invitation?token=${invitationToken}`;
    
    await sendDeveloperInvitation({
      to: developer.email,
      organizationName: organization.name,
      invitationUrl
    });

    console.log('✅ Developer invited:', developer.email);

    res.status(201).json({
      success: true,
      message: "Invitation sent successfully",
      developer: {
        id: developer._id,
        email: developer.email,
        firstName: developer.firstName,
        lastName: developer.lastName,
        role: developer.role
      }
    });

  } catch (err) {
    console.error("Error inviting developer:", err);
    res.status(500).json({ error: "Failed to send invitation" });
  }
};

// ✅ Accept Developer Invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token and password required" });
    }

    // Find developer with valid invitation token
    const developer = await User.findOne({
      invitationToken: token,
      invitationExpires: { $gt: Date.now() }
    }).populate('organizationId');

    if (!developer) {
      return res.status(400).json({ error: "Invalid or expired invitation" });
    }

    // Hash new password
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update developer
    developer.password = hashedPassword;
    developer.invitationToken = undefined;
    developer.invitationExpires = undefined;
    developer.emailVerified = true;
    developer.status = "ACTIVE"; // ✅ Now can login
    await developer.save();

    console.log('✅ Developer invitation accepted:', developer.email);

    res.json({
      success: true,
      message: "Invitation accepted! You can now login.",
      redirectTo: "/auth"
    });

  } catch (err) {
    console.error("Error accepting invitation:", err);
    res.status(500).json({ error: "Failed to accept invitation" });
  }
};

// ✅ Get current user info
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('organizationId', 'name slug pricingPlan')
      .select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organizationId: user.organizationId?._id,
        organizationName: user.organizationId?.name,
        status: user.status,
        emailVerified: user.emailVerified
      }
    });

  } catch (err) {
    console.error("Error fetching current user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// ✅ Remove user from organization (CLIENT_ADMIN only)
exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { organizationId, role } = req.user;

    if (role !== 'CLIENT_ADMIN') {
      return res.status(403).json({ error: "Only admins can remove users" });
    }

    const userToRemove = await User.findById(userId);

    if (!userToRemove) {
      return res.status(404).json({ error: "User not found" });
    }

    // Can't remove users from other organizations
    if (userToRemove.organizationId.toString() !== organizationId) {
      return res.status(403).json({ error: "Cannot remove users from other organizations" });
    }

    // Can't remove CLIENT_ADMIN (yourself)
    if (userToRemove.role === 'CLIENT_ADMIN') {
      return res.status(400).json({ error: "Cannot remove organization admin" });
    }

    // Soft delete
    userToRemove.status = "DELETED";
    await userToRemove.save();

    // Decrement organization user count
    const organization = await Organization.findById(organizationId);
    organization.currentUsers -= 1;
    await organization.save();

    res.json({
      success: true,
      message: "User removed successfully"
    });

  } catch (err) {
    console.error("Error removing user:", err);
    res.status(500).json({ error: "Failed to remove user" });
  }
};