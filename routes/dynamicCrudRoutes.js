// routes/dynamicCrudRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const DynamicCrudController = require('../controllers/dynamicCrudController');

// ✅ NEW: List all entities in current project
router.get('/entities', authMiddleware, DynamicCrudController.listEntities);

// Create entity definition
router.post('/entity', authMiddleware, DynamicCrudController.defineEntity);

// Dynamic CRUD endpoints (existing)
router.get('/:organizationId/:entityName', authMiddleware, DynamicCrudController.createCrudHandler('list'));
router.post('/:organizationId/:entityName', authMiddleware, DynamicCrudController.createCrudHandler('create'));
router.get('/:organizationId/:entityName/:recordId', authMiddleware, DynamicCrudController.createCrudHandler('read'));
router.put('/:organizationId/:entityName/:recordId', authMiddleware, DynamicCrudController.createCrudHandler('update'));
router.delete('/:organizationId/:entityName/:recordId', authMiddleware, DynamicCrudController.createCrudHandler('delete'));

module.exports = router;