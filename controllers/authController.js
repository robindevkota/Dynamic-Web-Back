// backend/controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const Organization = require("../models/Organization");
const { sendVerificationEmail } = require("../utils/emailService");

// ✅ STEP 1: SIGNUP (Creates user + org, sends verification email)
// backend/controllers/authController.js (signup only - replace your current one)

// In authController.js - Replace your signup function

exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, organizationName, pricingPlan } = req.body;

    // Validation
    if (!email || !password || !organizationName || !pricingPlan) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Validate pricing plan
    const validPlans = ["starter", "professional", "enterprise"];
    if (!validPlans.includes(pricingPlan)) {
      return res.status(400).json({ error: "Invalid pricing plan" });
    }

    const planLimits = {
      starter: { maxUsers: 4, maxProjects: 4 },
      professional: { maxUsers: 8, maxProjects: 8 },
      enterprise: { maxUsers: 10, maxProjects: 10 }
    };

    const limits = planLimits[pricingPlan];

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    // 1. Create organization (temporarily without ownerId)
    const organization = await Organization.create({
      name: organizationName,
      slug: `${organizationName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      pricingPlan,
      maxUsers: limits.maxUsers,
      maxProjects: limits.maxProjects,
      currentUsers: 1,
      currentProjects: 0,
      status: "PENDING_PAYMENT",
      billing: {
        status: "TRIAL",
        trialStartDate: new Date(),
        trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      }
    });

    // 2. Create the user
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: firstName?.trim() || "",
      lastName: lastName?.trim() || "",
      role: "CLIENT_ADMIN",
      organizationId: organization._id,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      status: "PENDING_VERIFICATION"
    });

    // 3. Link owner back to organization
    organization.ownerId = user._id;
    await organization.save();

    console.log(`✅ Organization created with owner: ${user._id}`);

    // ⚠️ IMPORTANT: Construct the verification URL correctly
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

    console.log('🔗 Verification URL:', verificationUrl);

    // Send verification email
    await sendVerificationEmail({
      to: user.email,
      name: user.firstName || 'User',
      verificationUrl
    });

    console.log('✅ Signup successful, verification email sent to:', user.email);

    res.status(201).json({
      success: true,
      message: "Account created! Please check your email to verify your account.",
      email: user.email,
      nextStep: "EMAIL_VERIFICATION",
      // ⚠️ FOR TESTING ONLY - REMOVE IN PRODUCTION
      debugToken: process.env.NODE_ENV === 'development' ? verificationToken : undefined
    });

  } catch (err) {
    console.error("═══════════════════════════════════════════════════════════");
    console.error("Signup crashed with payload:", JSON.stringify(req.body, null, 2));
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Full error object:", err);
    if (err.stack) {
      console.error("Stack trace:\n", err.stack.split('\n').slice(0, 10).join('\n'));
    }
    console.error("═══════════════════════════════════════════════════════════");

    let status = 500;
    let clientError = "Signup failed - internal error";

    if (err.name === 'MongoServerError' && err.code === 11000) {
      status = 409;
      clientError = "Email or organization slug already exists";
    } else if (err.name === 'ValidationError') {
      status = 400;
      const firstError = Object.values(err.errors || {})[0];
      clientError = `Data validation failed: ${firstError?.message || err.message}`;
    } else if (err.name?.includes('MongoServerSelection') || err.name?.includes('MongooseServerSelection')) {
      status = 503;
      clientError = "Database connection issue - please try again later";
    }

    res.status(status).json({
      error: clientError,
      debug: process.env.NODE_ENV !== 'production' ? err.message : undefined
    });
  }
};


// ✅ STEP 2: VERIFY EMAIL
// Replace verifyEmail in authController.js

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Verification token required" });
    }

    // First, try to find user with this token
    let user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    }).populate('organizationId');

    // If not found with valid token, check if user already verified this token
    if (!user) {
      // Check if a user exists who might have already used this token
      // We'll search by the fact that they're verified but in PENDING_PAYMENT status
      user = await User.findOne({
        emailVerified: true,
        status: "PENDING_PAYMENT"
      }).populate('organizationId').sort({ updatedAt: -1 }).limit(1);

      // If we found a recently verified user, allow them to continue
      if (user) {
        console.log('⚠️  Token already used, but allowing user to proceed to payment');
        
        return res.json({
          success: true,
          message: "Email already verified! Proceeding to payment.",
          alreadyVerified: true,
          nextStep: "PAYMENT",
          organization: {
            id: user.organizationId._id,
            name: user.organizationId.name,
            plan: user.organizationId.pricingPlan,
            trialEndDate: user.organizationId.billing?.trialEndDate
          }
        });
      }

      // If still not found, the token is truly invalid
      return res.status(400).json({ 
        error: "Invalid or expired verification token" 
      });
    }

    // Mark email as verified
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    user.status = "PENDING_PAYMENT";
    await user.save();

    console.log('✅ Email verified for:', user.email);

    // Return payment info
    res.json({
      success: true,
      message: "Email verified successfully!",
      nextStep: "PAYMENT",
      organization: {
        id: user.organizationId._id,
        name: user.organizationId.name,
        plan: user.organizationId.pricingPlan,
        trialEndDate: user.organizationId.billing?.trialEndDate
      }
    });

  } catch (err) {
    console.error("Email verification error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
};

// Add this to authController.js

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already verified
    if (user.emailVerified) {
      return res.status(400).json({ 
        error: "Email already verified",
        nextStep: user.status === "PENDING_PAYMENT" ? "PAYMENT" : "LOGIN"
      });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // Send email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

    console.log('🔗 NEW Verification URL:', verificationUrl);

    await sendVerificationEmail({
      to: user.email,
      name: user.firstName || 'User',
      verificationUrl
    });

    console.log('✅ Verification email resent to:', user.email);

    res.json({
      success: true,
      message: "Verification email sent! Please check your inbox.",
      // FOR TESTING ONLY
      debugToken: process.env.NODE_ENV === 'development' ? verificationToken : undefined
    });

  } catch (err) {
    console.error("Resend verification error:", err);
    res.status(500).json({ error: "Failed to resend verification email" });
  }
};


// Add this route to authRoutes.js
// router.post("/resend-verification", resendVerification);

// ✅ STEP 3: HANDLE PAYMENT SUCCESS (Called by Stripe webhook)
// Add this function to handle actual Stripe payment
// backend/controllers/authController.js
exports.handlePaymentSuccess = async (req, res) => {
  try {
    // For webhook: expect metadata from session
    const { organizationId } = req.body;  // from metadata in real webhook

    if (!organizationId) {
      return res.status(400).json({ error: "Missing organizationId" });
    }

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    const user = await User.findOne({ 
      organizationId: organization._id, 
      role: "CLIENT_ADMIN" 
    });

    if (!user) return res.status(404).json({ error: "Owner user not found" });

    // In real webhook you get customer & subscription from event.data.object
    // For CLI trigger test: use fake values or skip customer creation
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    // Fake/simulated values from trigger (in real life → from event)
    const customerId = 'cus_test_' + Date.now();  // or from session.customer
    const subscriptionId = 'sub_test_' + Date.now();  // or from session.subscription

    // Update DB
    organization.billing.status = "ACTIVE";
    organization.billing.stripeCustomerId = customerId;
    organization.billing.stripeSubscriptionId = subscriptionId;
    organization.billing.subscriptionStartDate = new Date();
    organization.billing.currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    organization.status = "ACTIVE";
    await organization.save();

    user.status = "ACTIVE";
    await user.save();

    console.log('✅ Account activated via mock payment');

    res.json({
      success: true,
      message: "Payment successful! Account activated.",
      subscription: { id: subscriptionId }
    });

  } catch (err) {
    console.error("Payment error:", err.message || err);
    res.status(500).json({ error: err.message || "Payment processing failed" });
  }
};


// ✅ STEP 4: LOGIN (Only allowed if status is ACTIVE)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Find user (include password for comparison)
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    }).select("+password").populate('organizationId');

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Check user status
    if (user.status === "PENDING_VERIFICATION") {
      return res.status(403).json({ 
        error: "Please verify your email first",
        nextStep: "EMAIL_VERIFICATION"
      });
    }

    if (user.status === "PENDING_PAYMENT") {
      return res.status(403).json({ 
        error: "Please complete payment to activate your account",
        nextStep: "PAYMENT",
        organizationId: user.organizationId._id
      });
    }

    if (user.status === "SUSPENDED") {
      return res.status(403).json({ error: "Account suspended. Please contact support." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Check organization billing status
    if (user.role !== 'SUPER_ADMIN' && user.organizationId) {
      if (user.organizationId.billing.status === "CANCELED") {
        return res.status(403).json({ error: "Subscription canceled. Please renew." });
      }
      if (user.organizationId.billing.status === "PAST_DUE") {
        return res.status(403).json({ error: "Payment overdue. Please update payment method." });
      }
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId?._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Set HTTP-only cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    console.log('✅ Login successful:', user.email);

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationId: user.organizationId?._id,
        organizationName: user.organizationId?.name
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/", // Important: must match the path used when setting the cookie
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};