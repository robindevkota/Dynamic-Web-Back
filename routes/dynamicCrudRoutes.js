// routes/dynamicCrudRoutes.js - FIXED VERSION
// Properly separates platform-tier and website-tier authentication

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Platform tier
const { endUserAdminAuth, optionalEndUserAuth, getOrgIdFromSlug } = require("../middleware/websiteTierAuth"); // Website tier
const DynamicCrudController = require("../controllers/dynamicCrudController");
const DynamicEntity = require("../models/DynamicEntity");
const { upload } = DynamicCrudController;

/**
 * CRITICAL MIDDLEWARE: Dynamic authentication based on entity configuration
 * 
 * Flow:
 * 1. Check if websiteSlug is provided (website-tier access)
 * 2. Look up the entity to check if it's marked as public
 * 3. Route to appropriate auth:
 *    - Public entity + websiteSlug → Allow unauthenticated
 *    - Protected entity + websiteSlug → Require END_USER_ADMIN auth
 *    - No websiteSlug → Require platform auth (DEVELOPER/CLIENT_ADMIN/SUPER_ADMIN)
 */
async function dynamicEntityAuth(req, res, next) {
  const { organizationId, entityName } = req.params;
  
  // Get website slug from various sources
  let websiteSlug = req.headers['x-website-slug'] || 
                    req.query.websiteSlug || 
                    req.body?.websiteSlug;
  
  // ✅ AUTO-DETECT: If no websiteSlug but has website cookie, find the slug
  if (!websiteSlug && !req.cookies?.auth_token) {
    // Check if any website-specific cookie exists
    const cookieNames = Object.keys(req.cookies || {});
    const websiteCookie = cookieNames.find(name => 
      name.endsWith('_auth_token') && name !== 'auth_token'
    );
    
    if (websiteCookie) {
      // Extract slug from cookie name (e.g., "chiyaz_auth_token" → "chiyaz")
      websiteSlug = websiteCookie.replace('_auth_token', '');
      console.log(`   ✅ Auto-detected websiteSlug from cookie: ${websiteSlug}`);
    } else {
      // Try to find website from organizationId
      const PageConfig = require('../models/PageConfig');
      const page = await PageConfig.findOne({ 
        organizationId,
        status: { $ne: 'Deleted' }
      }).select('slug').lean();
      
      if (page) {
        websiteSlug = page.slug;
        console.log(`   ✅ Auto-detected websiteSlug from org: ${websiteSlug}`);
      }
    }
  }
  
  console.log(`\n🔍 Dynamic Entity Auth Check:`);
  console.log(`   Entity: ${entityName}`);
  console.log(`   OrgID: ${organizationId}`);
  console.log(`   Website: ${websiteSlug || 'NONE (platform access)'}`);

  try {
    // ═══════════════════════════════════════════════════════════
    // CASE 1: Platform-tier access (no websiteSlug after detection)
    // ═══════════════════════════════════════════════════════════
    if (!websiteSlug) {
      console.log(`   → Platform-tier access (requires DEVELOPER/CLIENT_ADMIN/SUPER_ADMIN)`);
      
      // ✅ Check if platform cookie exists
      const platformToken = req.cookies?.auth_token;
      
      if (!platformToken) {
        console.log('   ❌ No platform auth_token - rejecting request');
        return res.status(401).json({ 
          error: "Authentication required",
          hint: "Please log in to the platform",
          tier: "platform"
        });
      }
      
      return authMiddleware(req, res, next);
    }

    // ═══════════════════════════════════════════════════════════
    // CASE 2: Website-tier access (websiteSlug detected/provided)
    // ═══════════════════════════════════════════════════════════
    
    // Verify org matches website
    const expectedOrgId = await getOrgIdFromSlug(websiteSlug);
    
    if (!expectedOrgId) {
      return res.status(400).json({ 
        error: "Invalid website slug" 
      });
    }

    if (expectedOrgId !== organizationId) {
      console.log(`   ❌ Org mismatch: expected ${expectedOrgId}, got ${organizationId}`);
      return res.status(403).json({ 
        error: "Organization mismatch" 
      });
    }

    // Look up entity to check access level
    let entity = await DynamicEntity.findOne({
      organizationId,
      entityName,
    }).lean();

    // Try global entity if not found
    if (!entity && organizationId === 'global') {
      entity = await DynamicEntity.findOne({
        entityName,
        isGlobal: true,
      }).lean();
    }

    if (!entity) {
      return res.status(404).json({ 
        error: `Entity "${entityName}" not found` 
      });
    }

    // ✅ Check if entity is public
    const isPublicEntity = entity.isPublic === true || entity.publicAccess === true;

    if (isPublicEntity) {
      // PUBLIC ENTITY: Allow unauthenticated access
      console.log(`   ✅ Public entity - allowing unauthenticated access`);
      
      // Create a public user object for logging purposes
      req.user = {
        userId: "public",
        organizationId: organizationId,
        role: "PUBLIC_USER",
        websiteSlug: websiteSlug,
        isPublicAccess: true
      };
      
      return next();
    } else {
      // PROTECTED ENTITY: Require END_USER_ADMIN authentication
      console.log(`   🔒 Protected entity - requiring END_USER_ADMIN auth`);
      return endUserAdminAuth(req, res, next);
    }

  } catch (err) {
    console.error("❌ Dynamic auth error:", err);
    return res.status(500).json({ 
      error: "Authentication check failed",
      message: err.message 
    });
  }
}

/**
 * Schema endpoint - needs special handling
 * - Platform tier: Requires platform auth
 * - Website tier: Uses optional auth (allows public access)
 */
async function dynamicSchemaAuth(req, res, next) {
  const { organizationId } = req.params;
  
  const websiteSlug = req.headers['x-website-slug'] || 
                     req.query.websiteSlug || 
                     req.body?.websiteSlug;
  
  if (!websiteSlug) {
    // Platform access
    const platformToken = req.cookies?.auth_token; // ✅ ADD THIS CHECK
    
    if (!platformToken) {
      return res.status(401).json({ 
        error: "Authentication required",
        hint: "Please log in to access schema",
        tier: "platform"
      });
    }
    
    return authMiddleware(req, res, next);
  }

  // Website access - verify org matches
  try {
    const expectedOrgId = await getOrgIdFromSlug(websiteSlug);
    
    if (!expectedOrgId || expectedOrgId !== organizationId) {
      return res.status(403).json({ error: "Organization mismatch" });
    }

    // Allow public access to schemas
    req.user = {
      userId: "public",
      organizationId: organizationId,
      role: "PUBLIC_USER",
      websiteSlug: websiteSlug,
      isPublicAccess: true
    };
    
    next();
  } catch (err) {
    console.error("❌ Schema auth error:", err);
    return res.status(500).json({ error: "Authentication check failed" });
  }
}

// ============================================
// ENTITY MANAGEMENT (platform-tier only)
// Requires DEVELOPER, CLIENT_ADMIN, or SUPER_ADMIN
// ============================================
router.get("/entities", authMiddleware, DynamicCrudController.listEntities);
router.post("/entity", authMiddleware, DynamicCrudController.defineEntity);
router.put("/entity/:entityId", authMiddleware, DynamicCrudController.updateEntity);
router.delete("/entity/:entityId", authMiddleware, DynamicCrudController.deleteEntity);

// ============================================
// SCHEMA ROUTE - Website-tier public access
// ============================================
router.get(
  "/:organizationId/:entityName/schema",
  dynamicSchemaAuth,
  DynamicCrudController.getEntity
);

// ============================================
// DYNAMIC CRUD ROUTES - Smart authentication
// Uses dynamicEntityAuth to determine access level
// ============================================

// LIST
router.get(
  "/:organizationId/:entityName",
  dynamicEntityAuth,
  DynamicCrudController.createCrudHandler("list")
);

// CREATE
router.post(
  "/:organizationId/:entityName",
  dynamicEntityAuth,
  upload.any(),
  DynamicCrudController.createCrudHandler("create")
);

// READ ONE
router.get(
  "/:organizationId/:entityName/:recordId",
  dynamicEntityAuth,
  DynamicCrudController.createCrudHandler("read")
);

// UPDATE
router.put(
  "/:organizationId/:entityName/:recordId",
  dynamicEntityAuth,
  upload.any(),
  DynamicCrudController.createCrudHandler("update")
);

// DELETE
router.delete(
  "/:organizationId/:entityName/:recordId",
  dynamicEntityAuth,
  DynamicCrudController.createCrudHandler("delete")
);

module.exports = router;