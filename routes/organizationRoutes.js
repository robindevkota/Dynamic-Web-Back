// backend/routes/organizationRoutes.js

const express = require("express");
const { 
  getOrganizationForPayment,
  getOrganization 
} = require("../controllers/organizationController");


const router = express.Router();

// ✅ PUBLIC route - no authentication needed
router.get("/payment/:orgId", getOrganizationForPayment);

// ✅ PROTECTED route - requires authentication
router.get("/:orgId",  getOrganization);

module.exports = router;