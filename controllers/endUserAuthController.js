// backend/controllers/endUserAuthController.js
// FIXED VERSION - End users bypass payment, go directly to ACTIVE

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const PageConfig = require("../models/PageConfig");
const { sendEndUserVerificationEmail } = require("../utils/emailService");

// Optional simple in-memory cache (clears on server restart)
const orgCache = new Map();

// ═══════════════════════════════════════════════════════════════
// HELPER: Get organizationId from websiteSlug
// ═══════════════════════════════════════════════════════════════
const getOrgIdFromWebsiteSlug = async (websiteSlug) => {
  if (!websiteSlug) return null;

  if (orgCache.has(websiteSlug)) {
    return orgCache.get(websiteSlug);
  }

  try {
    const page = await PageConfig.findOne({ slug: websiteSlug })
      .select("organizationId")
      .lean();

    const orgId = page?.organizationId?.toString() || null;
    if (orgId) orgCache.set(websiteSlug, orgId);
    else console.warn(`No org for slug: ${websiteSlug}`);
    return orgId;
  } catch (err) {
    console.error("Org lookup error:", err);
    return null;
  }
};

// ═══════════════════════════════════════════════════════════════
// CHECK SESSION - End user authentication status
// ═══════════════════════════════════════════════════════════════
exports.checkSession = async (req, res) => {
  try {
    const websiteSlug = req.query.websiteSlug || req.headers['x-website-slug'] || req.body.websiteSlug;
    if (!websiteSlug) return res.json({ authenticated: false });

    const cookieName = `${websiteSlug}_auth_token`;
    const token = req.cookies[cookieName];
    if (!token) return res.json({ authenticated: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user || user.status !== 'ACTIVE') return res.json({ authenticated: false });

    // Allow END_USER and END_USER_ADMIN on website portal
    if (!["END_USER", "END_USER_ADMIN"].includes(user.role)) {
      return res.json({ authenticated: false });
    }

    const expectedOrgId = await getOrgIdFromWebsiteSlug(websiteSlug);
    if (!expectedOrgId || user.organizationId.toString() !== expectedOrgId) {
      return res.json({ authenticated: false });
    }

    res.json({
      authenticated: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    res.json({ authenticated: false });
  }
};

// ═══════════════════════════════════════════════════════════════
// SIGNUP - End users (website visitors)
// ✅ Creates END_USER role, status PENDING_VERIFICATION
// ═══════════════════════════════════════════════════════════════
exports.signup = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName = "",
      lastName = "",
      name = "",
      fullName = "",
      websiteSlug,
    } = req.body;

    if (!email || !password || !websiteSlug) {
      return res.status(400).json({ 
        error: "Email, password, and websiteSlug are required" 
      });
    }

    // Get org from slug only
    const orgId = await getOrgIdFromWebsiteSlug(websiteSlug);
    if (!orgId) {
      return res.status(400).json({ error: "Invalid website" });
    }

    // Check if email already exists
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // ═══════════════════════════════════════════════════════════
    // SUPER FLEXIBLE NAME PARSING
    // Handles ALL cases: fullName, name, firstName only, etc.
    // ═══════════════════════════════════════════════════════════
    let finalFirstName = "";
    let finalLastName = "";

    // 1. Prefer fullName if provided
    if (fullName.trim()) {
      const parts = fullName.trim().split(/\s+/);
      finalFirstName = parts[0] || "";
      finalLastName = parts.slice(1).join(" ") || "";
    }
    // 2. Fallback to name (single field)
    else if (name.trim()) {
      const parts = name.trim().split(/\s+/);
      finalFirstName = parts[0] || "";
      finalLastName = parts.slice(1).join(" ") || "";
    }
    // 3. Use firstName + lastName if both present
    else if (firstName.trim() || lastName.trim()) {
      finalFirstName = firstName.trim();
      finalLastName = lastName.trim();
    }

    // If still empty, use email prefix as fallback first name
    if (!finalFirstName && !finalLastName) {
      finalFirstName = email.split("@")[0] || "User";
    }

    console.log("Processed name →", { finalFirstName, finalLastName });

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // ✅ Create END_USER (status: PENDING_VERIFICATION → will become ACTIVE after verify)
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: finalFirstName,
      lastName: finalLastName,
      role: "END_USER", // ✅ END_USER role (not CLIENT_ADMIN)
      organizationId: orgId,
      websiteSlug,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      status: "PENDING_VERIFICATION", // ✅ Will become ACTIVE after verify (NO payment)
    });

    console.log(`✅ END_USER created: ${user.email} | Name: ${finalFirstName} ${finalLastName}`);
    console.log(`   → Status: PENDING_VERIFICATION (will become ACTIVE after verify)`);

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

    await sendEndUserVerificationEmail({
      to: user.email,
      name: finalFirstName || "User",
      verificationUrl,
      appName: "Chiyaz"
    });

    res.status(201).json({
      success: true,
      message: "Account created! Check your email to verify.",
      nextStep: "EMAIL_VERIFICATION",
    });
  } catch (err) {
    console.error("Signup error:", err);
    let status = 500;
    let errorMsg = "Signup failed";

    if (err.code === 11000) {
      status = 409;
      errorMsg = "Email already registered";
    } else if (err.name === "ValidationError") {
      status = 400;
      errorMsg = Object.values(err.errors)[0]?.message || "Invalid data";
    }

    res.status(status).json({ error: errorMsg });
  }
};

// ═══════════════════════════════════════════════════════════════
// VERIFY EMAIL - End users (website visitors)
// ✅ FIX: Sets status to ACTIVE immediately (NO payment required)
// ═══════════════════════════════════════════════════════════════
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: "Verification token required" });

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // ✅ CHECK: This should ONLY verify end users (END_USER, END_USER_ADMIN)
    if (!["END_USER", "END_USER_ADMIN"].includes(user.role)) {
      return res.status(400).json({
        error: "Invalid user type for end user verification",
        hint: "Platform users should use /api/auth/verify-email"
      });
    }

    // ✅ Activate immediately – NO payment step for end users
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    user.status = "ACTIVE"; // ✅ ACTIVE (not PENDING_PAYMENT)
    await user.save();

    console.log(`✅ END_USER verified & activated: ${user.email}`);
    console.log(`   → Status set to ACTIVE (no payment required)`);

    res.json({
      success: true,
      message: "Email verified! You can now log in.",
      nextStep: "LOGIN",
    });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
};

// ═══════════════════════════════════════════════════════════════
// RESEND VERIFICATION - End users
// ═══════════════════════════════════════════════════════════════
// Add this to endUserAuthController.js

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find user - must be END_USER or END_USER_ADMIN
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      role: { $in: ["END_USER", "END_USER_ADMIN"] }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already verified
    if (user.emailVerified) {
      return res.status(400).json({ 
        error: "Email already verified",
        nextStep: user.status === "ACTIVE" ? "LOGIN" : "CONTACT_SUPPORT"
      });
    }

    // Generate new verification token
    const crypto = require("crypto");
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // Send email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

    console.log('🔗 NEW End-User Verification URL:', verificationUrl);

    const { sendEndUserVerificationEmail } = require('../utils/emailService');
    await sendEndUserVerificationEmail({
      to: user.email,
      name: user.firstName || 'User',
      verificationUrl,
      appName: user.websiteSlug || 'Our Platform'
    });

    console.log('✅ End-user verification email resent to:', user.email);

    res.json({
      success: true,
      message: "Verification email sent! Please check your inbox.",
      // Only include debug token in development
      debugToken: process.env.NODE_ENV !== 'production' ? verificationToken : undefined
    });

  } catch (err) {
    console.error("Resend verification error:", err);
    res.status(500).json({ error: "Failed to resend verification email" });
  }
};

// ═══════════════════════════════════════════════════════════════
// LOGIN - End users (website visitors)
// ✅ Only allows ACTIVE END_USERs (no payment check)
// ═══════════════════════════════════════════════════════════════
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const websiteSlug = req.body.websiteSlug || req.headers["x-website-slug"];

    if (!websiteSlug) return res.status(400).json({ error: "websiteSlug required" });

    const expectedOrgId = await getOrgIdFromWebsiteSlug(websiteSlug);
    if (!expectedOrgId) return res.status(400).json({ error: "Invalid website" });

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // ✅ Status check for END_USER
    if (user.status === "PENDING_VERIFICATION") {
      return res.status(403).json({ 
        error: "Please verify your email first", 
        nextStep: "EMAIL_VERIFICATION" 
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({ error: "Account not active" });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Allow END_USER and END_USER_ADMIN (block platform roles)
    if (!["END_USER", "END_USER_ADMIN"].includes(user.role)) {
      return res.status(403).json({ error: "This account cannot log in here" });
    }

    // ✅ Org check
    if (user.organizationId.toString() !== expectedOrgId) {
      return res.status(403).json({ error: "Account does not belong to this website" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId.toString(),
        websiteSlug,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.lastLogin = new Date();
    await user.save();

    const cookieName = `${websiteSlug}_auth_token`;
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    console.log('✅ END_USER login successful:', user.email);

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// ═══════════════════════════════════════════════════════════════
// LOGOUT - End users
// ═══════════════════════════════════════════════════════════════
exports.logout = async (req, res) => {
  try {
    const websiteSlug = req.body.websiteSlug || req.headers['x-website-slug'];
    
    if (!websiteSlug) {
      return res.status(400).json({ 
        error: "Website slug required for logout" 
      });
    }

    const cookieName = `${websiteSlug}_auth_token`;
    
    console.log(`🚪 Logging out from ${websiteSlug}, clearing cookie: ${cookieName}`);
    
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });

    res.status(200).json({ 
      success: true,
      message: "Logged out successfully",
      redirectUrl: `/${websiteSlug}`
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Logout failed" });
  }
};

// ═══════════════════════════════════════════════════════════════
// PASSWORD RESET FLOW - End users
// ═══════════════════════════════════════════════════════════════
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ 
      email: email.toLowerCase(),
      role: { $in: ["END_USER", "END_USER_ADMIN"] }
    });

    if (!user) {
      // Don't reveal if user exists
      return res.json({
        success: true,
        message: "If that email exists, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    console.log("🔑 Password reset URL:", resetUrl);

    // TODO: Send email with resetUrl

    res.json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Failed to process request" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token and password required" });
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
      role: { $in: ["END_USER", "END_USER_ADMIN"] }
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    console.log("✅ Password reset successful:", user.email);

    res.json({
      success: true,
      message: "Password reset successfully! You can now login.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
};

module.exports = exports;