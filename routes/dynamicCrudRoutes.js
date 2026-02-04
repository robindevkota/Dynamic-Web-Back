// routes/dynamicCrudRoutes.js - FULLY DYNAMIC VERSION
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const DynamicCrudController = require("../controllers/dynamicCrudController");
const PageConfig = require("../models/PageConfig");
const { upload } = DynamicCrudController;

// ✅ Cache for website slug → organizationId mapping
const orgCache = new Map();

// ✅ DYNAMIC: Get organizationId from website slug
async function getOrgIdFromSlug(websiteSlug) {
  if (!websiteSlug) return null;
  
  // Check cache first
  if (orgCache.has(websiteSlug)) {
    return orgCache.get(websiteSlug);
  }
  
  try {
    // Find page config by slug
    const page = await PageConfig.findOne({ slug: websiteSlug })
      .select('organizationId')
      .lean();
    
    const orgId = page?.organizationId?.toString() || null;
    
    if (orgId) {
      orgCache.set(websiteSlug, orgId);
      console.log(`✅ Cached: ${websiteSlug} → ${orgId}`);
    } else {
      console.warn(`⚠️ No org found for slug: ${websiteSlug}`);
    }
    
    return orgId;
  } catch (err) {
    console.error('❌ Org lookup error:', err);
    return null;
  }
}

// ✅ DYNAMIC: Middleware to allow public access based on website slug
const dynamicPublicOrAuthMiddleware = async (req, res, next) => {
  const { organizationId } = req.params;
  
  // Get website slug from various sources
  const websiteSlug = req.headers['x-website-slug'] || 
                     req.query.websiteSlug || 
                     req.body?.websiteSlug;
  
  console.log(`🔍 Dynamic middleware - OrgID: ${organizationId}, Slug: ${websiteSlug}`);
  
  // If website slug is provided, resolve org and allow public access
  if (websiteSlug) {
    const expectedOrgId = await getOrgIdFromSlug(websiteSlug);
    
    if (expectedOrgId && expectedOrgId === organizationId) {
      console.log(`✅ Public access granted for ${websiteSlug} (${organizationId})`);
      
      req.user = {
        userId: "000000000000000000000000",
        organizationId: organizationId,
        role: "PUBLIC_USER",
        websiteSlug: websiteSlug
      };
      
      return next();
    } else {
      console.log(`❌ Org mismatch: expected ${expectedOrgId}, got ${organizationId}`);
    }
  }
  
  // Otherwise require authentication
  return authMiddleware(req, res, next);
};

// ✅ DYNAMIC: Schema middleware
const dynamicSchemaMiddleware = async (req, res, next) => {
  const { organizationId } = req.params;
  
  const websiteSlug = req.headers['x-website-slug'] || 
                     req.query.websiteSlug || 
                     req.body?.websiteSlug;
  
  if (websiteSlug) {
    const expectedOrgId = await getOrgIdFromSlug(websiteSlug);
    
    if (expectedOrgId && expectedOrgId === organizationId) {
      req.user = {
        userId: "000000000000000000000000",
        organizationId: organizationId,
        role: "PUBLIC_USER",
        websiteSlug: websiteSlug
      };
      
      return next();
    }
  }
  
  // Otherwise require authentication
  return authMiddleware(req, res, next);
};

// ============================================
// ENTITY MANAGEMENT (always requires auth)
// ============================================
router.get("/entities", authMiddleware, DynamicCrudController.listEntities);
router.post("/entity", authMiddleware, DynamicCrudController.defineEntity);
router.put(
  "/entity/:entityId",
  authMiddleware,
  DynamicCrudController.updateEntity,
);
router.delete(
  "/entity/:entityId",
  authMiddleware,
  DynamicCrudController.deleteEntity,
);

// ============================================
// ✅ SCHEMA ROUTE - Dynamic public access
// ============================================
router.get(
  "/:organizationId/:entityName/schema",
  dynamicSchemaMiddleware,
  DynamicCrudController.getEntity
);

// ============================================
// DYNAMIC CRUD - Public access based on website slug
// ============================================
router.get(
  "/:organizationId/:entityName",
  dynamicPublicOrAuthMiddleware,
  DynamicCrudController.createCrudHandler("list"),
);

router.post(
  "/:organizationId/:entityName",
  dynamicPublicOrAuthMiddleware,
  upload.any(),
  DynamicCrudController.createCrudHandler("create"),
);

router.get(
  "/:organizationId/:entityName/:recordId",
  dynamicPublicOrAuthMiddleware,
  DynamicCrudController.createCrudHandler("read"),
);

router.put(
  "/:organizationId/:entityName/:recordId",
  dynamicPublicOrAuthMiddleware,
  upload.any(),
  DynamicCrudController.createCrudHandler("update"),
);

router.delete(
  "/:organizationId/:entityName/:recordId",
  dynamicPublicOrAuthMiddleware,
  DynamicCrudController.createCrudHandler("delete"),
);

module.exports = router;