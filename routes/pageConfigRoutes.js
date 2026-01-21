// routes/pageConfigRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// ⚠️ Check if projectPermissions middleware exists
let canCreateProject, canEditProject, canDeleteProject;
try {
  const permissions = require('../middleware/projectPermissions');
  canCreateProject = permissions.canCreateProject;
  canEditProject = permissions.canEditProject;
  canDeleteProject = permissions.canDeleteProject;
  console.log('✅ Project permissions middleware loaded');
} catch (err) {
  console.warn('⚠️ Project permissions middleware not found, using passthrough');
  // Fallback: no-op middleware
  canCreateProject = canEditProject = canDeleteProject = (req, res, next) => next();
}

const {
  getAllPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  cloneTemplate
} = require('../controllers/pageConfigController');

// ✅ Table data - list all pages (auth required)
router.get('/', authMiddleware, getAllPages);

// ✅✅✅ PUBLIC: Get single page by slug (NO AUTH for rendering public pages like /auth, /signup)
// This allows DynamicRenderer to load public pages without being logged in
router.get('/:slug', getPageBySlug);

// ✅ Create new page (auth + permission check)
router.post('/', authMiddleware, canCreateProject, createPage);

// ✅ Clone template (auth + permission check)
router.post('/clone/:slug', authMiddleware, canCreateProject, cloneTemplate);

// ✅ Update page (auth + permission check)
router.put('/:slug', authMiddleware, canEditProject, updatePage);

// ✅ Delete page (auth + permission check)
router.delete('/:slug', authMiddleware, canDeleteProject, deletePage);

module.exports = router;