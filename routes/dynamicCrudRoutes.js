// routes/dynamicCrudRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const DynamicCrudController = require('../controllers/dynamicCrudController');
const { upload } = DynamicCrudController;

const DEMO_ORG_ID = '000000000000000000000001';

// ✅ Middleware to allow demo access without auth
const demoOrAuthMiddleware = (req, res, next) => {
  const { organizationId } = req.params;
  
  // If it's demo org, skip auth
  if (organizationId === DEMO_ORG_ID) {
    req.user = {
      userId: '000000000000000000000000',
      organizationId: DEMO_ORG_ID,
      role: 'DEMO_USER'
    };
    return next();
  }
  
  // Otherwise require auth
  return authMiddleware(req, res, next);
};

// Entity management (always requires auth)
router.get('/entities', authMiddleware, DynamicCrudController.listEntities);
router.post('/entity', authMiddleware, DynamicCrudController.defineEntity);
router.put('/entity/:entityId', authMiddleware, DynamicCrudController.updateEntity);
router.delete('/entity/:entityId', authMiddleware, DynamicCrudController.deleteEntity);

// ✅ Dynamic CRUD - allows demo access
router.get('/:organizationId/:entityName', demoOrAuthMiddleware, DynamicCrudController.createCrudHandler('list'));
router.post('/:organizationId/:entityName', demoOrAuthMiddleware, upload.any(), DynamicCrudController.createCrudHandler('create'));
router.get('/:organizationId/:entityName/:recordId', demoOrAuthMiddleware, DynamicCrudController.createCrudHandler('read'));
router.put('/:organizationId/:entityName/:recordId', demoOrAuthMiddleware, upload.any(), DynamicCrudController.createCrudHandler('update'));
router.delete('/:organizationId/:entityName/:recordId', demoOrAuthMiddleware, DynamicCrudController.createCrudHandler('delete'));

module.exports = router;