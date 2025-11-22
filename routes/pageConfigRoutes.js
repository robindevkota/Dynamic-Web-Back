// routes/pageConfigRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
} = require('../controllers/pageConfigController');

// Table data
router.get('/', getAllPages);

// Renderer
router.get('/:slug', getPageBySlug);

// CRUD
router.post('/', createPage);
router.put('/:slug', updatePage);
router.delete('/:slug', deletePage);

module.exports = router;