// backend/controllers/organizationController.js

const Organization = require("../models/Organization");

// ✅ PUBLIC endpoint - for payment page (no auth required)
exports.getOrganizationForPayment = async (req, res) => {
  try {
    const { orgId } = req.params;

    if (!orgId) {
      return res.status(400).json({ error: "Organization ID required" });
    }

    const organization = await Organization.findById(orgId).select(
      'name pricingPlan billing.status billing.trialEndDate status'
    );

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    // Only allow access if organization is in PENDING_PAYMENT status
    if (organization.status !== "PENDING_PAYMENT") {
      return res.status(400).json({ 
        error: "Organization is not pending payment",
        currentStatus: organization.status 
      });
    }

    res.json({
      success: true,
      organization: {
        id: organization._id,
        name: organization.name,
        plan: organization.pricingPlan,
        billingStatus: organization.billing?.status,
        trialEndDate: organization.billing?.trialEndDate,
        status: organization.status
      }
    });

  } catch (err) {
    console.error("Error fetching organization for payment:", err);
    res.status(500).json({ error: "Failed to fetch organization" });
  }
};

// ✅ Protected endpoint - for authenticated users
exports.getOrganization = async (req, res) => {
  try {
    const { orgId } = req.params;
    
    const organization = await Organization.findById(orgId);
    
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json({ success: true, organization });
  } catch (err) {
    console.error("Error fetching organization:", err);
    res.status(500).json({ error: "Failed to fetch organization" });
  }
};