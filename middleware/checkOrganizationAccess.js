// backend/middleware/checkOrganizationAccess.js

const Organization = require('../models/Organization');

/**
 * Middleware to check if user's organization is active
 * Applied to all admin panel routes
 */
exports.checkOrganizationAccess = async (req, res, next) => {
  try {
    const { organizationId, role } = req.user;
    
    // ✅ SUPER_ADMIN bypasses organization checks
    if (role === 'SUPER_ADMIN') {
      return next();
    }
    
    // ✅ Users without organization (shouldn't happen, but safety check)
    if (!organizationId) {
      return res.status(403).json({ 
        error: "No organization associated with your account" 
      });
    }
    
    // ✅ Check organization status
    const organization = await Organization.findById(organizationId);
    
    if (!organization) {
      return res.status(404).json({ 
        error: "Organization not found" 
      });
    }
    
    // ✅ Block access if organization is inactive
    if (organization.status !== 'ACTIVE') {
      console.log(`🚫 Organization access denied: ${organization.name} (${organization.status})`);
      
      return res.status(403).json({ 
        error: "Your organization is currently inactive",
        status: organization.status,
        reason: organization.deactivationReason,
        message: getDeactivationMessage(organization.deactivationReason),
        contactEmail: "support@yourplatform.com"
      });
    }
    
    // ✅ Attach organization to request for later use
    req.organization = organization;
    next();
    
  } catch (err) {
    console.error("❌ Organization access check failed:", err);
    res.status(500).json({ error: "Failed to verify organization access" });
  }
};

/**
 * Get user-friendly message based on deactivation reason
 */
function getDeactivationMessage(reason) {
  const messages = {
    'PAYMENT_FAILED': 'Your subscription payment has failed. Please update your payment method.',
    'TRIAL_EXPIRED': 'Your trial period has expired. Please upgrade to continue.',
    'MANUAL': 'Your organization has been deactivated. Please contact support.',
    'POLICY_VIOLATION': 'Your organization has been suspended due to policy violations. Please contact support.'
  };
  
  return messages[reason] || 'Your organization is currently inactive. Please contact support.';
}