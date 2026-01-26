// backend/controllers/dynamicCrudController.js

const mongoose = require('mongoose');
const DynamicEntity = require('../models/DynamicEntity');
const APIConfig = require('../models/APIConfig');

// ───────────────────────────────────────────────
//  Dynamic Model Factory (cached per entity slug)
// ───────────────────────────────────────────────
const modelCache = new Map();

function getDynamicModel(entity) {
  const cacheKey = entity.slug;

  if (modelCache.has(cacheKey)) {
    return modelCache.get(cacheKey);
  }

  const schemaDef = {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,  // ✅ CHANGED FROM true TO false
      index: true,
      default: null
    },
    projectUUID: {
      type: String,
      required: false,
      index: true,
      default: null
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  };

  // ✅ Handle both Map and plain object for schema
  let schemaEntries;
  if (entity.schema instanceof Map) {
    schemaEntries = Array.from(entity.schema.entries());
  } else if (typeof entity.schema === 'object' && entity.schema !== null) {
    schemaEntries = Object.entries(entity.schema);
  } else {
    throw new Error(`Invalid schema format for entity ${entity.entityName}`);
  }

  // Convert schema entries to mongoose fields
  for (const [fieldName, fieldDef] of schemaEntries) {
    const fieldSchema = {
      type: mapFieldType(fieldDef.type),
      required: fieldDef.required || false,
      default: fieldDef.default !== undefined ? fieldDef.default : undefined
    };

    if (fieldDef.validation) {
      if (fieldDef.validation.min !== undefined) fieldSchema.min = fieldDef.validation.min;
      if (fieldDef.validation.max !== undefined) fieldSchema.max = fieldDef.validation.max;
    }

    schemaDef[fieldName] = fieldSchema;
  }

  const schema = new mongoose.Schema(schemaDef, {
    timestamps: true,
    collection: `dyn_${entity.slug.replace(/[^a-zA-Z0-9_]/g, '_')}`
  });

  const Model = mongoose.model(
    `Dynamic_${entity.slug.replace(/[^a-zA-Z0-9_]/g, '_')}`,
    schema
  );

  modelCache.set(cacheKey, Model);

  console.log(`✅ Dynamic model created: ${entity.entityName}`);

  return Model;
}

function mapFieldType(type) {
  const typeMap = {
    string: String,
    number: Number,
    boolean: Boolean,
    date: Date,
    array: [mongoose.Schema.Types.Mixed],
    object: mongoose.Schema.Types.Mixed
    // Future: file → { url: String, name: String, size: Number }, relation → ObjectId
  };
  return typeMap[type] || String;
}

// ───────────────────────────────────────────────
//  Controller Class
// ───────────────────────────────────────────────
class DynamicCrudController {



  // controllers/dynamicCrudController.js

  static async listEntities(req, res) {
    try {
      const { organizationId, projectId, projectUUID } = req.user;

      // ✅ SIMPLIFIED: Just get all entities for this organization
      // The frontend can filter by project if needed
      const query = {
        organizationId
      };

      console.log('🔍 Fetching all entities for org:', organizationId);

      const entities = await DynamicEntity.find(query)
        .select('entityName slug schema operations projectUUID projectId createdAt updatedAt')
        .lean();

      const entitiesWithSchema = entities.map(entity => ({
        ...entity,
        schema: entity.schema || {},
        scope: entity.projectUUID || entity.projectId ? 'project' : 'organization'
      }));

      console.log(`✅ Found ${entitiesWithSchema.length} entities`);

      res.json({
        success: true,
        count: entitiesWithSchema.length,
        entities: entitiesWithSchema,
        context: {
          organizationId,
          projectId: projectId || null,
          projectUUID: projectUUID || null
        }
      });
    } catch (error) {
      console.error('❌ listEntities failed:', error);
      res.status(500).json({ error: error.message });
    }
  }
  // ── 1. Define new entity (creates metadata + auto APIConfig)
  static async defineEntity(req, res) {
    try {
      const { entityName, schema, operations, projectUUID, projectId } = req.body;
      const { organizationId, userId } = req.user;

      // ✅ Project is now OPTIONAL - can come from:
      // 1. Request body (user explicitly specifies)
      // 2. User's JWT token (current active project)
      // 3. Neither (organization-level entity)
      const finalProjectId = projectId || req.user.projectId || null;
      const finalProjectUUID = projectUUID || req.user.projectUUID || null;

      if (!entityName || typeof entityName !== 'string' || !/^[a-z][a-z0-9_]*$/.test(entityName)) {
        return res.status(400).json({
          error: "Invalid entityName (lowercase, numbers, underscores only)"
        });
      }

      // ✅ Create slug based on available identifiers
      let slug;
      if (finalProjectUUID) {
        slug = `${organizationId}-${finalProjectUUID}-${entityName}`;
      } else if (finalProjectId) {
        slug = `${organizationId}-${finalProjectId}-${entityName}`;
      } else {
        // Organization-level entity (no project)
        slug = `${organizationId}-${entityName}`;
      }

      console.log(`🏗️  Creating entity with slug: ${slug}`);

      // Check for duplicates
      const existing = await DynamicEntity.findOne({ slug });
      if (existing) {
        return res.status(409).json({
          error: `Entity "${entityName}" already exists in this scope`,
          existingSlug: existing.slug
        });
      }

      // ✅ Create entity - projectId/projectUUID are optional
      const entity = await DynamicEntity.create({
        organizationId,
        projectId: finalProjectId,
        projectUUID: finalProjectUUID,
        entityName,
        slug,
        schema: new Map(Object.entries(schema)),
        operations: operations || ['create', 'read', 'update', 'delete', 'list'],
        createdBy: userId
      });

      // Auto-register API config
      const apiKey = `crud_${slug}`;
      await APIConfig.findOneAndUpdate(
        { key: apiKey },
        {
          key: apiKey,
          name: `Dynamic CRUD: ${entityName}`,
          description: `Auto-generated CRUD API for ${entityName}`,
          type: 'dynamic',
          baseUrl: `/api/crud/${organizationId}/${entityName}`,
          methods: entity.operations.map(op => op.toUpperCase()),
          isActive: true,
          projectUUID: finalProjectUUID,
          organizationId,
          authRequired: true,
          createdBy: userId,
          tags: ['dynamic', 'crud', entityName]
        },
        { upsert: true, new: true }
      );

      console.log(`✅ Entity created: ${entityName} | slug: ${slug}`);

      res.status(201).json({
        success: true,
        entity: {
          ...entity.toObject(),
          schema: Object.fromEntries(entity.schema)
        },
        apiEndpoint: `/api/crud/${organizationId}/${entityName}`,
        apiConfigKey: apiKey,
        scope: finalProjectUUID || finalProjectId ? 'project' : 'organization'
      });
    } catch (error) {
      console.error('❌ defineEntity failed:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // ── Generic CRUD handler factory
  static createCrudHandler(operation) {
    return async (req, res) => {
      try {
        const { organizationId, entityName } = req.params;
        const { projectId: userProjectId, projectUUID: userProjectUUID, userId } = req.user;

        // ✅ FIXED: Query entity by organizationId and entityName only
        // Don't filter by projectId here since entity metadata doesn't need it
        const entity = await DynamicEntity.findOne({
          organizationId,
          entityName
        }).lean();

        if (!entity) {
          return res.status(404).json({
            error: `Entity "${entityName}" not found`
          });
        }

        // ✅ Convert schema to plain object if needed
        if (entity.schema && typeof entity.schema === 'object' && !Array.isArray(entity.schema)) {
          if (entity.schema.$__ || entity.schema.constructor.name === 'Map') {
            entity.schema = Object.fromEntries(
              Object.entries(entity.schema).filter(([key]) => !key.startsWith('$'))
            );
          }
        }

        // Check if operation is allowed
        if (!entity.operations.includes(operation)) {
          return res.status(403).json({
            error: `Operation "${operation}" not allowed for this entity`
          });
        }

        const Model = getDynamicModel(entity);

        // ✅ Use the entity's projectId for data operations (not user's)
        const projectId = entity.projectId;
        const projectUUID = entity.projectUUID;

        switch (operation) {
          // ── LIST ───────────────────────────────────────
          case 'list': {
            const query = { organizationId };
            if (projectId) query.projectId = projectId;
            if (projectUUID) query.projectUUID = projectUUID;

            const items = await Model.find(query).lean();
            return res.json({ success: true, count: items.length, data: items });
          }

          // ── CREATE ─────────────────────────────────────
          case 'create': {
            const validation = DynamicCrudController.validateRecord(req.body, entity.schema, false);
            if (!validation.valid) {
              return res.status(400).json({
                error: 'Validation failed',
                details: validation.errors
              });
            }

            const record = new Model({
              ...req.body,
              projectId: projectId || null,
              projectUUID: projectUUID || null,
              organizationId,
              createdBy: userId
            });

            await record.save();

            return res.status(201).json({
              success: true,
              record: record.toObject()
            });
          }

          // ── READ ONE ───────────────────────────────────
          case 'read': {
            const { recordId } = req.params;
            if (!mongoose.isValidObjectId(recordId)) {
              return res.status(400).json({ error: 'Invalid record ID' });
            }

            const query = { _id: recordId, organizationId };
            if (projectId) query.projectId = projectId;
            if (projectUUID) query.projectUUID = projectUUID;

            const record = await Model.findOne(query).lean();

            if (!record) {
              return res.status(404).json({ error: 'Record not found' });
            }

            return res.json({ success: true, record });
          }

          // ── UPDATE ─────────────────────────────────────
          case 'update': {
            const { recordId } = req.params;
            if (!mongoose.isValidObjectId(recordId)) {
              return res.status(400).json({ error: 'Invalid record ID' });
            }

            const validation = DynamicCrudController.validateRecord(req.body, entity.schema, true);
            if (!validation.valid) {
              return res.status(400).json({
                error: 'Validation failed',
                details: validation.errors
              });
            }

            const query = { _id: recordId, organizationId };
            if (projectId) query.projectId = projectId;
            if (projectUUID) query.projectUUID = projectUUID;

            const updated = await Model.findOneAndUpdate(
              query,
              { ...req.body, updatedBy: userId },
              { new: true, runValidators: true, lean: true }
            );

            if (!updated) {
              return res.status(404).json({ error: 'Record not found' });
            }

            return res.json({ success: true, record: updated });
          }

          // ── DELETE ─────────────────────────────────────
          case 'delete': {
            const { recordId } = req.params;
            if (!mongoose.isValidObjectId(recordId)) {
              return res.status(400).json({ error: 'Invalid record ID' });
            }

            const query = { _id: recordId, organizationId };
            if (projectId) query.projectId = projectId;
            if (projectUUID) query.projectUUID = projectUUID;

            const deleted = await Model.findOneAndDelete(query);

            if (!deleted) {
              return res.status(404).json({ error: 'Record not found' });
            }

            return res.json({
              success: true,
              message: 'Record deleted',
              deletedId: recordId
            });
          }

          default:
            return res.status(400).json({ error: 'Invalid operation' });
        }
      } catch (error) {
        console.error(`[${operation.toUpperCase()}] Error:`, error);
        res.status(500).json({
          error: 'Internal server error',
          message: error.message
        });
      }
    };
  }

  // ── Keep your excellent validation logic ───────────────
  static validateRecord(data, schemaMap, isPartial = false) {
    const errors = {};

    // ✅ Convert to entries array if it's a plain object
    let schemaEntries;
    if (schemaMap instanceof Map) {
      schemaEntries = Array.from(schemaMap.entries());
    } else if (typeof schemaMap === 'object') {
      schemaEntries = Object.entries(schemaMap);
    } else {
      return { valid: false, errors: { schema: 'Invalid schema format' } };
    }

    for (const [fieldName, fieldSchema] of schemaEntries) {
      const value = data[fieldName];

      // Required check
      if (fieldSchema.required && !isPartial && (value === undefined || value === null)) {
        errors[fieldName] = `${fieldName} is required`;
        continue;
      }

      if (value !== undefined && value !== null) {
        // Type check
        if (fieldSchema.type === 'number' && typeof value !== 'number') {
          errors[fieldName] = `${fieldName} must be a number`;
        }
        if (fieldSchema.type === 'string' && typeof value !== 'string') {
          errors[fieldName] = `${fieldName} must be a string`;
        }

        // Custom validation rules
        if (fieldSchema.validation) {
          const val = fieldSchema.validation;
          if (val.min !== undefined && value < val.min) {
            errors[fieldName] = `${fieldName} must be at least ${val.min}`;
          }
          if (val.max !== undefined && value > val.max) {
            errors[fieldName] = `${fieldName} must be at most ${val.max}`;
          }
          if (val.minLength !== undefined && String(value).length < val.minLength) {
            errors[fieldName] = `${fieldName} must be at least ${val.minLength} characters`;
          }
          if (val.maxLength !== undefined && String(value).length > val.maxLength) {
            errors[fieldName] = `${fieldName} must be at most ${val.maxLength} characters`;
          }
        }
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }

  static async updateEntity(req, res) {
    try {
      const { entityId } = req.params;
      const { entityName, schema, operations } = req.body;
      const { organizationId, userId } = req.user;

      if (!mongoose.isValidObjectId(entityId)) {
        return res.status(400).json({ error: 'Invalid entity ID' });
      }

      // Find existing entity
      const entity = await DynamicEntity.findOne({
        _id: entityId,
        organizationId
      });

      if (!entity) {
        return res.status(404).json({ error: 'Entity not found' });
      }

      // ⚠️ Check if entity name is changing
      if (entityName && entityName !== entity.entityName) {
        // Validate new name
        if (!/^[a-z][a-z0-9_]*$/.test(entityName)) {
          return res.status(400).json({
            error: "Invalid entityName (lowercase, numbers, underscores only)"
          });
        }

        // Update slug
        const projectIdentifier = entity.projectUUID || entity.projectId?.toString() || '';
        const newSlug = projectIdentifier
          ? `${organizationId}-${projectIdentifier}-${entityName}`
          : `${organizationId}-${entityName}`;

        // Check if new slug already exists
        const existing = await DynamicEntity.findOne({
          slug: newSlug,
          _id: { $ne: entityId }
        });

        if (existing) {
          return res.status(409).json({
            error: `Entity "${entityName}" already exists`
          });
        }

        entity.entityName = entityName;
        entity.slug = newSlug;
      }

      // Update schema if provided
      if (schema) {
        entity.schema = new Map(Object.entries(schema));
      }

      // Update operations if provided
      if (operations) {
        entity.operations = operations;
      }

      entity.updatedBy = userId;
      await entity.save();

      // Clear model cache so new schema takes effect
      const modelCache = require('./dynamicCrudController').modelCache || new Map();
      if (modelCache.has(entity.slug)) {
        modelCache.delete(entity.slug);
        console.log(`🗑️ Cleared model cache for ${entity.slug}`);
      }

      // Update API config
      const apiKey = `crud_${entity.slug}`;
      await APIConfig.findOneAndUpdate(
        { key: apiKey },
        {
          name: `Dynamic CRUD: ${entity.entityName}`,
          baseUrl: `/api/crud/${organizationId}/${entity.entityName}`,
          methods: entity.operations.map(op => op.toUpperCase()),
          updatedBy: userId
        }
      );

      console.log(`✅ Entity updated: ${entity.entityName}`);

      res.json({
        success: true,
        entity: {
          ...entity.toObject(),
          schema: Object.fromEntries(entity.schema)
        },
        message: 'Entity updated successfully'
      });

    } catch (error) {
      console.error('❌ updateEntity failed:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // ✅ NEW: Delete entity definition
  static async deleteEntity(req, res) {
    try {
      const { entityId } = req.params;
      const { organizationId } = req.user;

      if (!mongoose.isValidObjectId(entityId)) {
        return res.status(400).json({ error: 'Invalid entity ID' });
      }

      // Find entity
      const entity = await DynamicEntity.findOne({
        _id: entityId,
        organizationId
      });

      if (!entity) {
        return res.status(404).json({ error: 'Entity not found' });
      }

      // ⚠️ Check if there are any records in the collection
      const Model = getDynamicModel(entity);
      const recordCount = await Model.countDocuments();

      if (recordCount > 0) {
        return res.status(400).json({
          error: `Cannot delete entity. It has ${recordCount} existing records. Delete all records first.`,
          recordCount
        });
      }

      // Delete the entity definition
      await DynamicEntity.deleteOne({ _id: entityId });

      // Clear model cache
      const modelCache = require('./dynamicCrudController').modelCache || new Map();
      if (modelCache.has(entity.slug)) {
        modelCache.delete(entity.slug);
      }

      // Delete API config
      const apiKey = `crud_${entity.slug}`;
      await APIConfig.deleteOne({ key: apiKey });

      // Drop the collection (optional - only if you want to clean up completely)
      // await Model.collection.drop().catch(() => {});

      console.log(`🗑️ Entity deleted: ${entity.entityName}`);

      res.json({
        success: true,
        message: `Entity "${entity.entityName}" deleted successfully`,
        deletedEntity: entity.entityName
      });

    } catch (error) {
      console.error('❌ deleteEntity failed:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DynamicCrudController;