// routes/dynamicCrudRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const DynamicCrudController = require('../controllers/dynamicCrudController');

// Entity management
router.get('/entities', authMiddleware, DynamicCrudController.listEntities);
router.post('/entity', authMiddleware, DynamicCrudController.defineEntity);
router.put('/entity/:entityId', authMiddleware, DynamicCrudController.updateEntity);
router.delete('/entity/:entityId', authMiddleware, DynamicCrudController.deleteEntity);

// Dynamic CRUD endpoints for records (existing)
router.get('/:organizationId/:entityName', authMiddleware, DynamicCrudController.createCrudHandler('list'));
router.post('/:organizationId/:entityName', authMiddleware, DynamicCrudController.createCrudHandler('create'));
router.get('/:organizationId/:entityName/:recordId', authMiddleware, DynamicCrudController.createCrudHandler('read'));
router.put('/:organizationId/:entityName/:recordId', authMiddleware, DynamicCrudController.createCrudHandler('update'));
router.delete('/:organizationId/:entityName/:recordId', authMiddleware, DynamicCrudController.createCrudHandler('delete'));

module.exports = router;