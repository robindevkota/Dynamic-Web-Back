// routes/dynamicCrudRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const DynamicCrudController = require("../controllers/dynamicCrudController");
const { upload } = DynamicCrudController;

const DEMO_ORG_ID = "000000000000000000000001";
const CHIYAZ_ORG_ID = "696fd6f8a216cc192d63b84a"; // ✅ ADD THIS

// ✅ UPDATED: Middleware to allow demo + Chiyaz access without auth
const demoOrAuthMiddleware = (req, res, next) => {
  const { organizationId } = req.params;

  // ✅ Allow both demo org AND Chiyaz org to bypass auth
  if (organizationId === DEMO_ORG_ID || organizationId === CHIYAZ_ORG_ID) {
    req.user = {
      userId: "000000000000000000000000",
      organizationId: organizationId, // ✅ Use the actual org ID
      role: organizationId === DEMO_ORG_ID ? "DEMO_USER" : "PUBLIC_USER",
    };
    return next();
  }

  // Otherwise require auth
  return authMiddleware(req, res, next);
};

// ✅ UPDATED: Schema middleware to support both demo and Chiyaz
const schemaMiddleware = (req, res, next) => {
  const { organizationId } = req.params;
  
  // ✅ Allow schema access for demo and Chiyaz orgs
  if (organizationId === DEMO_ORG_ID || organizationId === CHIYAZ_ORG_ID) {
    req.user = {
      userId: "000000000000000000000000",
      organizationId: organizationId,
      role: organizationId === DEMO_ORG_ID ? "DEMO_USER" : "PUBLIC_USER",
    };
    return next();
  }
  
  // Otherwise require auth
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
// ✅ SCHEMA ROUTE - Updated to use organizationId
// ============================================
router.get(
  "/:organizationId/:entityName/schema", // ✅ CHANGED: Added organizationId param
  schemaMiddleware,
  DynamicCrudController.getEntity,
);

// ============================================
// DYNAMIC CRUD - allows demo + Chiyaz access
// ============================================
router.get(
  "/:organizationId/:entityName",
  demoOrAuthMiddleware,
  DynamicCrudController.createCrudHandler("list"),
);
router.post(
  "/:organizationId/:entityName",
  demoOrAuthMiddleware,
  upload.any(),
  DynamicCrudController.createCrudHandler("create"),
);
router.get(
  "/:organizationId/:entityName/:recordId",
  demoOrAuthMiddleware,
  DynamicCrudController.createCrudHandler("read"),
);
router.put(
  "/:organizationId/:entityName/:recordId",
  demoOrAuthMiddleware,
  upload.any(),
  DynamicCrudController.createCrudHandler("update"),
);
router.delete(
  "/:organizationId/:entityName/:recordId",
  demoOrAuthMiddleware,
  DynamicCrudController.createCrudHandler("delete"),
);

module.exports = router;