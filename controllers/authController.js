const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Organization = require("../models/Organization"); // ✅ Import Organization

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  if (user.status !== "ACTIVE") return res.status(403).json({ error: "Account suspended" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role, orgId: user.organizationId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.json({
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      organizationId: user.organizationId || null,
    },
  });
};




exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, organizationName, pricingPlan } = req.body;

    if (!email || !password || !organizationName || !pricingPlan) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Set limits based on plan
    let maxUsers, maxProjects;
    switch (pricingPlan) {
      case "starter":
        maxUsers = 4;
        maxProjects = 4;
        break;
      case "professional":
        maxUsers = 8;
        maxProjects = 8;
        break;
      case "enterprise":
        maxUsers = 10;
        maxProjects = 10;
        break;
      default:
        return res.status(400).json({ error: "Invalid pricing plan" });
    }

    // 1️⃣ Create organization
    const organization = await Organization.create({
      name: organizationName,
      pricingPlan,
      maxUsers,
      maxProjects,
    });

    // 2️⃣ Create CLIENT_ADMIN
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "CLIENT_ADMIN",
      organizationId: organization._id,
      isEmailVerified: false,
    });

    // 3️⃣ Issue JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, orgId: organization._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organizationId: organization._id,
        pricingPlan: organization.pricingPlan,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// LOGOUT
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
