// backend/controllers/endUserAuthController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendVerificationEmail } = require("../utils/emailService");
exports.checkSession = async (req, res) => {
  try {
    const websiteSlug = 
      req.query.websiteSlug || 
      req.headers['x-website-slug'] || 
      req.body.websiteSlug;
    
    console.log('🔍 checkSession called');
    console.log('🔍 websiteSlug:', websiteSlug);
    console.log('🔍 All cookies:', req.cookies); // ✅ Log ALL cookies
    console.log('🔍 Raw cookie header:', req.headers.cookie); // ✅ Log raw header
    
    if (!websiteSlug) {
      console.log('❌ No websiteSlug provided');
      return res.json({ authenticated: false });
    }
    
    const cookieName = `${websiteSlug}_auth_token`;
    const token = req.cookies[cookieName];
    
    console.log(`🍪 Looking for cookie: ${cookieName}`);
    console.log(`🍪 Cookie value: ${token ? 'EXISTS' : 'NOT FOUND'}`);
    
    if (!token) {
      console.log('❌ No auth token found in request');
      return res.json({ authenticated: false });
    }
    
    // Rest of your verification code...
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || user.status !== 'ACTIVE') {
      console.log('❌ User not found or not active');
      return res.json({ authenticated: false });
    }
    
    console.log(`✅ Session valid for ${user.email}`);
    
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
    console.error('❌ Session check error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      console.log('❌ Invalid JWT token');
    } else if (error.name === 'TokenExpiredError') {
      console.log('❌ JWT token expired');
    }
    
    res.json({ authenticated: false });
  }
};
// ═══════════════════════════════════════════════════════
// END USER SIGNUP (For client websites - hotel guests, shoppers, etc.)
// ═══════════════════════════════════════════════════════
exports.signup = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      name, // ✅ Support single "name" field
      fullName, // ✅ Support "fullName" field
      organizationId,
      websiteSlug,
    } = req.body;

    console.log("📝 End User Signup Request:", {
      email,
      firstName,
      lastName,
      name,
      fullName,
      organizationId,
      hasPassword: !!password,
    });

    // ✅ FLEXIBLE VALIDATION - Only require email and password
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!organizationId) {
      return res.status(400).json({
        error:
          "Organization context required. This endpoint is for end users only.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // ✅ FLEXIBLE NAME HANDLING - Support multiple formats
    let finalFirstName = "";
    let finalLastName = "";

    if (firstName && lastName) {
      // Format 1: firstName + lastName
      finalFirstName = firstName.trim();
      finalLastName = lastName.trim();
    } else if (fullName) {
      // Format 2: fullName (split into first/last)
      const nameParts = fullName.trim().split(" ");
      finalFirstName = nameParts[0] || "";
      finalLastName = nameParts.slice(1).join(" ") || "";
    } else if (name) {
      // Format 3: name (split into first/last)
      const nameParts = name.trim().split(" ");
      finalFirstName = nameParts[0] || "";
      finalLastName = nameParts.slice(1).join(" ") || "";
    } else if (firstName) {
      // Format 4: firstName only
      finalFirstName = firstName.trim();
    }

    console.log("👤 Processed name:", {
      firstName: finalFirstName,
      lastName: finalLastName,
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // ✅ Create END USER (not CLIENT_ADMIN)
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: finalFirstName,
      lastName: finalLastName,
      role: "END_USER",
      organizationId,
      websiteSlug,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      status: "PENDING_VERIFICATION",
    });

    console.log(`✅ End user created: ${user.email} (org: ${organizationId})`);

    // Send verification email
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

    await sendVerificationEmail({
      to: user.email,
      name: finalFirstName || "User",
      verificationUrl,
    });

    res.status(201).json({
      success: true,
      message:
        "Account created! Please check your email to verify your account.",
      email: user.email,
      nextStep: "EMAIL_VERIFICATION",
    });
  } catch (err) {
    console.error("❌ End user signup error:", err);

    let status = 500;
    let clientError = "Signup failed";

    if (err.name === "MongoServerError" && err.code === 11000) {
      status = 409;
      clientError = "Email already registered";
    } else if (err.name === "ValidationError") {
      status = 400;
      const firstError = Object.values(err.errors || {})[0];
      clientError = `Validation failed: ${firstError?.message || err.message}`;

      // ✅ MORE DETAILED ERROR LOGGING
      console.error("Validation Details:", {
        errors: err.errors,
        message: err.message,
        name: err.name,
      });
    }

    res.status(status).json({ error: clientError });
  }
};

// ═══════════════════════════════════════════════════════
// END USER EMAIL VERIFICATION (unchanged)
// ═══════════════════════════════════════════════════════
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Verification token required" });
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid or expired verification token",
      });
    }

    // ✅ Mark as ACTIVE immediately (no payment step!)
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    user.status = "ACTIVE";
    await user.save();

    console.log("✅ End user email verified:", user.email);

    res.json({
      success: true,
      message: "Email verified successfully! You can now login.",
      nextStep: "LOGIN",
    });
  } catch (err) {
    console.error("Email verification error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
};

// ═══════════════════════════════════════════════════════
// END USER LOGIN (unchanged)
// ═══════════════════════════════════════════════════════
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ SIMPLIFIED STATUS CHECK (no payment, no organization billing)
    if (user.status === "PENDING_VERIFICATION") {
      return res.status(403).json({
        error: "Please verify your email first",
        nextStep: "EMAIL_VERIFICATION",
      });
    }

    if (user.status === "SUSPENDED") {
      return res.status(403).json({
        error: "Account suspended. Please contact support.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const websiteSlug =
      req.body.websiteSlug || req.headers["x-website-slug"] || "default";
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
        websiteSlug: websiteSlug, // ✅ Store slug in token
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // ✅ Set HTTP-only cookie with DYNAMIC NAME based on websiteSlug
    const isProduction = process.env.NODE_ENV === "production";
    const cookieName = `${websiteSlug}_auth_token`; // ✅ Dynamic name!

    console.log(`✅ Setting cookie: ${cookieName} for user: ${user.email}`);

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
      domain:undefined
    });

    console.log("✅ End user login successful:", user.email);

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

// ═══════════════════════════════════════════════════════
// END USER LOGOUT (unchanged)
// ═══════════════════════════════════════════════════════
// endUserAuthController.js - logout
exports.logout = async (req, res) => {
  try {
    // ✅ Get websiteSlug from request body or headers
    const websiteSlug = req.body.websiteSlug || req.headers['x-website-slug'];
    
    if (!websiteSlug) {
      return res.status(400).json({ 
        error: "Website slug required for logout" 
      });
    }

    // ✅ Clear ONLY this website's cookie
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
      redirectUrl: `/${websiteSlug}`  // ✅ Redirect to website home
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Logout failed" });
  }
};

// ═══════════════════════════════════════════════════════
// FORGOT PASSWORD (unchanged)
// ═══════════════════════════════════════════════════════
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
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

    res.json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Failed to process request" });
  }
};

// ═══════════════════════════════════════════════════════
// RESET PASSWORD (unchanged)
// ═══════════════════════════════════════════════════════
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token and password required" });
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
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

// backend/controllers/endUserAuthController.js
// ✅ ADD THIS NEW ENDPOINT

// ═══════════════════════════════════════════════════════
// CHECK SESSION (for auto-login)
// ═══════════════════════════════════════════════════════


module.exports = exports;
