// backend/middleware/publicCrudAuth.js

const DynamicEntity = require('../models/DynamicEntity');

/**
 * Middleware for public CRUD endpoints
 * Allows unauthenticated access for entities marked as public
 */
async function publicCrudAuth(req, res, next) {
  const { organizationId, entityName } = req.params;
  
  // Check if this entity allows public access
  const entity = await DynamicEntity.findOne({
    organizationId,
    entityName
  });
  
  if (!entity) {
    return res.status(404).json({ error: `Entity "${entityName}" not found` });
  }
  
  // ✅ If entity is marked as public, create a fake user object
  if (entity.isPublic) {
    req.user = {
      organizationId: entity.organizationId,
      userId: null,  // No user for public access
      role: 'PUBLIC'
    };
    return next();
  }
  
  // ✅ Otherwise, require authentication
  if (!req.user) {
    return res.status(401).json({ 
      error: "Authentication required",
      entityName,
      isPublic: false
    });
  }
  
  next();
}

module.exports = publicCrudAuth;