// backend/routes/pageConfigRoutes.js - FINAL CORRECTED VERSION

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Import optional auth middleware
let optionalAuth;
try {
  const optionalAuthMiddleware = require('../middleware/optionalAuth');
  optionalAuth = optionalAuthMiddleware.optionalAuth;
  console.log('✅ Optional auth middleware loaded');
} catch (err) {
  console.warn('⚠️ Optional auth middleware not found, using passthrough');
  optionalAuth = (req, res, next) => { req.user = null; next(); };
}

// ✅ Import organization access middleware
let checkOrganizationAccess;
try {
  const orgMiddleware = require('../middleware/checkOrganizationAccess');
  checkOrganizationAccess = orgMiddleware.checkOrganizationAccess;
  console.log('✅ Organization access middleware loaded');
} catch (err) {
  console.warn('⚠️ Organization access middleware not found, using passthrough');
  checkOrganizationAccess = (req, res, next) => next();
}

// ✅ Import project permissions middleware
let canCreateProject, canEditProject, canDeleteProject;
try {
  const permissions = require('../middleware/projectPermissions');
  canCreateProject = permissions.canCreateProject;
  canEditProject = permissions.canEditProject;
  canDeleteProject = permissions.canDeleteProject;
  console.log('✅ Project permissions middleware loaded');
} catch (err) {
  console.warn('⚠️ Project permissions middleware not found, using passthrough');
  canCreateProject = canEditProject = canDeleteProject = (req, res, next) => next();
}

const {
  getAllPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  cloneTemplate,
  toggleProjectStatus
} = require('../controllers/pageConfigController');

// ═══════════════════════════════════════════════════════════
// PUBLIC ROUTES (must come FIRST before protected routes)
// ═══════════════════════════════════════════════════════════

// ✅ Get single page by slug (PUBLIC - optional auth for admin features)
// Uses optionalAuth instead of authMiddleware to allow public access
router.get('/:slug', optionalAuth, getPageBySlug);

// ═══════════════════════════════════════════════════════════
// PROTECTED ROUTES (require authentication)
// ═══════════════════════════════════════════════════════════

// ✅ List all pages (admin table - requires auth)
router.get('/', authMiddleware, checkOrganizationAccess, getAllPages);

// ✅ Create new page (requires auth)
router.post('/', authMiddleware, checkOrganizationAccess, canCreateProject, createPage);

// ✅ Clone template (requires auth)
router.post('/clone/:slug', authMiddleware, checkOrganizationAccess, canCreateProject, cloneTemplate);

// ✅ Toggle project status (requires auth)
router.patch('/:slug/status', authMiddleware, checkOrganizationAccess, toggleProjectStatus);

// ✅ Update page (requires auth)
router.put('/:slug', authMiddleware, checkOrganizationAccess, canEditProject, updatePage);

// ✅ Delete page (requires auth)
router.delete('/:slug', authMiddleware, checkOrganizationAccess, canDeleteProject, deletePage);

module.exports = router;