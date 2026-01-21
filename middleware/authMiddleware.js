// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 🔍 Debug: Log all cookies
    console.log('🔍 All cookies received:', req.cookies);
    console.log('🔍 Cookie header:', req.headers.cookie);
    
    // Get token from cookie
    const token = req.cookies.auth_token;

    if (!token) {
      console.log('❌ No auth_token cookie found');
      return res.status(401).json({ 
        error: "Authentication required",
        debug: {
          cookiesReceived: Object.keys(req.cookies || {}),
          cookieHeader: req.headers.cookie ? 'present' : 'missing'
        }
      });
    }

    console.log('✅ Token found in cookie');

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      organizationId: decoded.organizationId
    };

    console.log('✅ User authenticated:', {
      userId: req.user.userId,
      email: req.user.email,
      role: req.user.role
    });

    next();

  } catch (err) {
    console.error("❌ Auth middleware error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};