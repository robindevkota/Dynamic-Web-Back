// backend/middleware/websiteTierAuth.js
// Handles authentication for website-tier routes (END_USER, END_USER_ADMIN)
// Completely separate from platform tier (SUPER_ADMIN, CLIENT_ADMIN, DEVELOPER)

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PageConfig = require('../models/PageConfig');

// Cache for website slug → organizationId mapping
const orgCache = new Map();

/**
 * Get organizationId from website slug
 */
async function getOrgIdFromSlug(websiteSlug) {
  if (!websiteSlug) return null;
  
  if (orgCache.has(websiteSlug)) {
    return orgCache.get(websiteSlug);
  }
  
  try {
    const page = await PageConfig.findOne({ slug: websiteSlug })
      .select('organizationId')
      .lean();
    
    const orgId = page?.organizationId?.toString() || null;
    
    if (orgId) {
      orgCache.set(websiteSlug, orgId);
      console.log(`✅ Cached: ${websiteSlug} → ${orgId}`);
    }
    
    return orgId;
  } catch (err) {
    console.error('❌ Org lookup error:', err);
    return null;
  }
}

/**
 * Middleware for END_USER_ADMIN protected routes
 * Only allows END_USER_ADMIN role from the correct organization
 */
exports.endUserAdminAuth = async (req, res, next) => {
  try {
    const websiteSlug = req.headers['x-website-slug'] || 
                       req.query.websiteSlug || 
                       req.body?.websiteSlug;
    
    if (!websiteSlug) {
      return res.status(400).json({ 
        error: "Website slug required for authentication" 
      });
    }

    console.log(`🔐 END_USER_ADMIN auth check for: ${websiteSlug}`);

    // Get token from website-specific cookie
    const cookieName = `${websiteSlug}_auth_token`;
    const token = req.cookies[cookieName];

    if (!token) {
      console.log(`❌ No ${cookieName} cookie found`);
      return res.status(401).json({ 
        error: "Authentication required",
        hint: "Please log in as an administrator"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // ✅ CHECK: Must be END_USER_ADMIN role
    if (user.role !== 'END_USER_ADMIN') {
      console.log(`❌ Access denied: ${user.role} is not END_USER_ADMIN`);
      return res.status(403).json({ 
        error: "Administrator access required",
        currentRole: user.role 
      });
    }

    // ✅ CHECK: Must be ACTIVE
    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ 
        error: "Account not active",
        status: user.status 
      });
    }

    // ✅ CHECK: Org must match website
    const expectedOrgId = await getOrgIdFromSlug(websiteSlug);
    
    if (!expectedOrgId) {
      return res.status(400).json({ error: "Invalid website" });
    }

    if (user.organizationId.toString() !== expectedOrgId) {
      console.log(`❌ Org mismatch: user ${user.organizationId} vs expected ${expectedOrgId}`);
      return res.status(403).json({ 
        error: "Access denied for this website" 
      });
    }

    // ✅ Attach user to request
    req.user = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      organizationId: user.organizationId.toString(),
      websiteSlug: websiteSlug
    };

    console.log(`✅ END_USER_ADMIN authenticated: ${user.email}`);
    next();

  } catch (err) {
    console.error("❌ END_USER_ADMIN auth error:", err.message);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired" });
    }
    
    return res.status(401).json({ error: "Authentication failed" });
  }
};

/**
 * Middleware for public END_USER routes (optional auth)
 * Allows unauthenticated access but populates req.user if logged in
 */
exports.optionalEndUserAuth = async (req, res, next) => {
  try {
    const websiteSlug = req.headers['x-website-slug'] || 
                       req.query.websiteSlug || 
                       req.body?.websiteSlug;
    
    if (!websiteSlug) {
      req.user = null;
      return next();
    }

    // Get token from website-specific cookie
    const cookieName = `${websiteSlug}_auth_token`;
    const token = req.cookies[cookieName];

    if (!token) {
      req.user = null;
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || user.status !== 'ACTIVE') {
      req.user = null;
      return next();
    }

    // ✅ Only allow END_USER or END_USER_ADMIN roles
    if (!['END_USER', 'END_USER_ADMIN'].includes(user.role)) {
      req.user = null;
      return next();
    }

    // ✅ Verify org matches
    const expectedOrgId = await getOrgIdFromSlug(websiteSlug);
    
    if (!expectedOrgId || user.organizationId.toString() !== expectedOrgId) {
      req.user = null;
      return next();
    }

    // ✅ Attach user to request
    req.user = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      organizationId: user.organizationId.toString(),
      websiteSlug: websiteSlug
    };

    next();

  } catch (err) {
    // On any error, just proceed as unauthenticated
    req.user = null;
    next();
  }
};

/**
 * Export helper function for use in other middlewares
 */
exports.getOrgIdFromSlug = getOrgIdFromSlug;