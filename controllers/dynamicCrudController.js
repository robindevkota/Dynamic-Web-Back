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
      required: true,
      index: true
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  };

  // Convert schema Map → mongoose schema fields
  for (const [fieldName, fieldDef] of entity.schema.entries()) {
    const fieldSchema = {
      type: mapFieldType(fieldDef.type),
      required: fieldDef.required || false,
      default: fieldDef.default !== undefined ? fieldDef.default : undefined
    };

    // Basic mongoose validators from your schema
    if (fieldDef.validation) {
      if (fieldDef.validation.min !== undefined) fieldSchema.min = fieldDef.validation.min;
      if (fieldDef.validation.max !== undefined) fieldSchema.max = fieldDef.validation.max;
      // minLength / maxLength / pattern → can be enforced in pre-validate hook later
    }

    schemaDef[fieldName] = fieldSchema;
  }

  const schema = new mongoose.Schema(schemaDef, {
    timestamps: true,
    collection: `dyn_${entity.slug.replace(/[^a-zA-Z0-9_]/g, '_')}` // safe collection name
  });

  const Model = mongoose.model(`Dynamic_${entity.slug.replace(/[^a-zA-Z0-9_]/g, '_')}`, schema);
  modelCache.set(cacheKey, Model);

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



static async listEntities(req, res) {
  try {
    const { organizationId, projectId, projectUUID } = req.user;

    const query = {
      organizationId,
      $or: []
    };

    if (projectUUID) query.$or.push({ projectUUID });
    if (projectId)    query.$or.push({ projectId });
    query.$or.push({ projectId: null, projectUUID: null });

    if (query.$or.length === 1) {
      delete query.$or;
      query.$or = [{ projectId: null, projectUUID: null }];
    }

    console.log('🔍 Query:', JSON.stringify(query, null, 2));

    const entities = await DynamicEntity.find(query)
      .select('entityName slug schema operations projectUUID projectId createdAt updatedAt')
      .lean();

    const entitiesWithSchema = entities.map(entity => ({
      ...entity,
      schema: entity.schema || {},                    // ← FIXED: plain object, no fromEntries needed
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
        const { projectId, userId } = req.user;

        // Load entity metadata
        const entity = await DynamicEntity.findOne({
          organizationId,
          entityName,
          projectId
        });

        if (!entity) {
          return res.status(404).json({ error: `Entity "${entityName}" not found in this project` });
        }

        // Check if operation is allowed
        if (!entity.operations.includes(operation)) {
          return res.status(403).json({ error: `Operation "${operation}" not allowed for this entity` });
        }

        const Model = getDynamicModel(entity);

        switch (operation) {
          // ── LIST ───────────────────────────────────────
          case 'list': {
            const items = await Model.find({ projectId, organizationId }).lean();
            return res.json({ success: true, count: items.length, data: items });
          }

          // ── CREATE ─────────────────────────────────────
          case 'create': {
            const validation = DynamicCrudController.validateRecord(req.body, entity.schema, false);
            if (!validation.valid) {
              return res.status(400).json({ error: 'Validation failed', details: validation.errors });
            }

            const record = new Model({
              ...req.body,
              projectId,
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

            const record = await Model.findOne({
              _id: recordId,
              projectId,
              organizationId
            }).lean();

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
              return res.status(400).json({ error: 'Validation failed', details: validation.errors });
            }

            const updated = await Model.findOneAndUpdate(
              { _id: recordId, projectId, organizationId },
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

            const deleted = await Model.findOneAndDelete({
              _id: recordId,
              projectId,
              organizationId
            });

            if (!deleted) {
              return res.status(404).json({ error: 'Record not found' });
            }

            return res.json({ success: true, message: 'Record deleted', deletedId: recordId });
          }

          default:
            return res.status(400).json({ error: 'Invalid operation' });
        }
      } catch (error) {
        console.error(`[${operation.toUpperCase()}] Error:`, error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
      }
    };
  }

  // ── Keep your excellent validation logic ───────────────
  static validateRecord(data, schemaMap, isPartial = false) {
    const errors = {};

    for (const [fieldName, fieldSchema] of schemaMap.entries()) {
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
        // boolean/date/array/object checks can be added similarly

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
}

module.exports = DynamicCrudController;