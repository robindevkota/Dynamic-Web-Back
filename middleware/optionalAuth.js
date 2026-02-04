// backend/middleware/optionalAuth.js - NEW FILE

/**
 * Optional Authentication Middleware
 * Attempts to authenticate but doesn't reject if authentication fails
 * Populates req.user if token is valid, but allows request to proceed either way
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.optionalAuth = async (req, res, next) => {
  try {
    // Try to get token from cookie
    const token = req.cookies?.token;
    
    if (!token) {
      // No token - proceed as unauthenticated user
      req.user = null;
      return next();
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Get user from database
    const user = await User.findById(decoded.userId)
      .select('email role organizationId')
      .lean();
    
    if (!user) {
      // Invalid user - proceed as unauthenticated
      req.user = null;
      return next();
    }
    
    // Valid user - attach to request
    req.user = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      organizationId: user.organizationId?.toString()
    };
    
    next();
    
  } catch (err) {
    // Token invalid or expired - proceed as unauthenticated
    req.user = null;
    next();
  }
};