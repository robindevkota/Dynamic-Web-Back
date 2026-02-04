// backend/controllers/dynamicCrudController.js

const mongoose = require("mongoose");
const DynamicEntity = require("../models/DynamicEntity");
const APIConfig = require("../models/APIConfig");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// ───────────────────────────────────────────────
//  FILE UPLOAD CONFIGURATION
// ───────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/dynamic");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images and documents allowed."));
    }
  },
});

// ───────────────────────────────────────────────
//  TYPE CONVERSION HELPERS
// ───────────────────────────────────────────────

/**
 * Convert FormData string values to their proper types based on schema
 */
function convertToSchemaType(value, fieldSchema) {
  // Skip conversion for files
  if (
    fieldSchema.type === "file" ||
    (fieldSchema.type === "array" && fieldSchema.items?.type === "file")
  ) {
    return value;
  }

  // Handle null/undefined
  if (value === null || value === undefined || value === "") {
    return value;
  }

  switch (fieldSchema.type) {
    case "number":
      const num = Number(value);
      return isNaN(num) ? value : num;

    case "boolean":
      if (typeof value === "boolean") return value;
      if (value === "true") return true;
      if (value === "false") return false;
      return Boolean(value);

    case "date":
      if (value instanceof Date) return value;
      try {
        return new Date(value);
      } catch (e) {
        return value;
      }

    case "array":
      // If it's already an array, return it
      if (Array.isArray(value)) return value;

      // If it's a JSON string, parse it
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [value];
        } catch (e) {
          // If not JSON, split by comma (for simple arrays)
          return value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean);
        }
      }

      return [value];

    case "object":
      if (typeof value === "object") return value;
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }

    default:
      return value;
  }
}

/**
 * Process record data and convert types based on schema
 */
function processRecordData(data, schema) {
  const processed = { ...data };

  // Get schema entries
  let schemaEntries;
  if (schema instanceof Map) {
    schemaEntries = Array.from(schema.entries());
  } else if (typeof schema === "object") {
    schemaEntries = Object.entries(schema);
  } else {
    return processed;
  }

  // Convert each field to its proper type
  for (const [fieldName, fieldSchema] of schemaEntries) {
    if (processed[fieldName] !== undefined) {
      processed[fieldName] = convertToSchemaType(
        processed[fieldName],
        fieldSchema,
      );
    }
  }

  return processed;
}

// ───────────────────────────────────────────────
//  Dynamic Model Factory (ENHANCED)
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
      required: false,
      index: true,
      default: null,
    },
    projectUUID: {
      type: String,
      required: false,
      index: true,
      default: null,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // ✅ Changed to false for global entities
      index: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  };

  let schemaEntries;
  if (entity.schema instanceof Map) {
    schemaEntries = Array.from(entity.schema.entries());
  } else if (typeof entity.schema === "object" && entity.schema !== null) {
    schemaEntries = Object.entries(entity.schema);
  } else {
    throw new Error(`Invalid schema format for entity ${entity.entityName}`);
  }

  for (const [fieldName, fieldDef] of schemaEntries) {
    schemaDef[fieldName] = mapFieldType(fieldDef);
  }

  const schema = new mongoose.Schema(schemaDef, {
    timestamps: true,
    collection: `dyn_${entity.slug.replace(/[^a-zA-Z0-9_]/g, "_")}`,
  });

  const Model = mongoose.model(
    `Dynamic_${entity.slug.replace(/[^a-zA-Z0-9_]/g, "_")}`,
    schema,
  );

  modelCache.set(cacheKey, Model);
  console.log(`✅ Dynamic model created: ${entity.entityName}`);

  return Model;
}

// ✅ ENHANCED: Support file, enum, array (including file arrays), relation types
function mapFieldType(fieldDef) {
  const { type, validation } = fieldDef;

  const baseSchema = {
    required: fieldDef.required || false,
    default: fieldDef.default !== undefined ? fieldDef.default : undefined,
  };

  // Apply validation rules
  if (validation) {
    if (validation.min !== undefined) baseSchema.min = validation.min;
    if (validation.max !== undefined) baseSchema.max = validation.max;
    if (validation.minLength !== undefined)
      baseSchema.minlength = validation.minLength;
    if (validation.maxLength !== undefined)
      baseSchema.maxlength = validation.maxLength;
    if (validation.enum) baseSchema.enum = validation.enum;
  }

  switch (type) {
    case "string":
      return { type: String, ...baseSchema };

    case "number":
      return { type: Number, ...baseSchema };

    case "boolean":
      return { type: Boolean, ...baseSchema };

    case "date":
      return { type: Date, ...baseSchema };

    // ✅ File type (stores metadata + path)
    case "file":
      return {
        type: {
          url: { type: String, required: true },
          filename: { type: String, required: true },
          originalName: String,
          mimetype: String,
          size: Number,
          uploadedAt: { type: Date, default: Date.now },
        },
        required: baseSchema.required,
        default: baseSchema.default,
      };

    // ✅ Enum type
    case "enum":
      return {
        type: String,
        enum: validation?.enum || [],
        ...baseSchema,
      };

    // ✅ Array type - supports file arrays too
    case "array":
      const itemType = fieldDef.items?.type || "string";

      // Special handling for file arrays
      if (itemType === "file") {
        return {
          type: [
            {
              url: { type: String, required: true },
              filename: { type: String, required: true },
              originalName: String,
              mimetype: String,
              size: Number,
              uploadedAt: { type: Date, default: Date.now },
            },
          ],
          default: [],
        };
      }

      return {
        type: [mapFieldType({ type: itemType, ...fieldDef.items })],
        default: [],
      };

    // ✅ Relation type (reference to another entity)
    case "relation":
      return {
        type: mongoose.Schema.Types.ObjectId,
        ref: fieldDef.ref || "DynamicRecord",
        ...baseSchema,
      };

    case "object":
      return { type: mongoose.Schema.Types.Mixed, ...baseSchema };

    default:
      return { type: String, ...baseSchema };
  }
}

// ───────────────────────────────────────────────
//  Controller Class (ENHANCED WITH GLOBAL SUPPORT)
// ───────────────────────────────────────────────
class DynamicCrudController {
  // ✅ LIST ENTITIES (UPDATED with global support)
  static async listEntities(req, res) {
    try {
      const { role, organizationId } = req.user; // ✅ Get role
      
      let query = {};
      
      // ✅ Role-based filtering (same pattern as PageConfig)
      if (role === 'SUPER_ADMIN') {
        // No filter - SUPER_ADMIN sees all entities
        console.log('🔓 SUPER_ADMIN - showing all entities');
      } 
      else if (role === 'CLIENT_ADMIN' || role === 'DEVELOPER') {
        // Can see: global entities + their org's entities
        console.log(`🔒 ${role} - filtering to global + org ${organizationId}`);
        query = {
          $or: [
            { isGlobal: true },                  // ✅ Global entities
            { organizationId: organizationId }   // ✅ Their org's entities
          ]
        };
      }

      console.log('📋 Entity query:', JSON.stringify(query, null, 2));

      const entities = await DynamicEntity.find(query)
        .select(
          "entityName slug schema operations projectUUID projectId createdAt updatedAt params isGlobal organizationId",
        )
        .lean();

      const entitiesWithSchema = entities.map((entity) => ({
        ...entity,
        schema: entity.schema || {},
        scope: entity.isGlobal ? "global" : 
               (entity.projectUUID || entity.projectId ? "project" : "organization"),
        // ✅ Add permission flags
        canEdit: role === 'SUPER_ADMIN' || 
                 (!entity.isGlobal && entity.organizationId?.toString() === organizationId),
        canDelete: role === 'SUPER_ADMIN' || 
                   (!entity.isGlobal && entity.organizationId?.toString() === organizationId),
      }));

      console.log(`✅ Returning ${entitiesWithSchema.length} entities for ${role}`);

      res.json({
        success: true,
        count: entitiesWithSchema.length,
        entities: entitiesWithSchema,
        context: { organizationId, role },
      });
    } catch (error) {
      console.error("❌ listEntities failed:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // ✅ DEFINE ENTITY (Enhanced with global support + params support)
  static async defineEntity(req, res) {
    try {
      const { entityName, schema, operations, projectUUID, projectId, params } =
        req.body;
      const { organizationId, userId, role } = req.user; // ✅ Add role

      // ✅ Check if trying to create global entity
      const isGlobal = req.body.isGlobal === true;
      
      if (isGlobal && role !== 'SUPER_ADMIN') {
        return res.status(403).json({
          error: "Only SUPER_ADMIN can create global entities",
        });
      }

      const finalProjectId = projectId || req.user.projectId || null;
      const finalProjectUUID = projectUUID || req.user.projectUUID || null;

      if (
        !entityName ||
        typeof entityName !== "string" ||
        !/^[a-z][a-z0-9_]*$/.test(entityName)
      ) {
        return res.status(400).json({
          error: "Invalid entityName (lowercase, numbers, underscores only)",
        });
      }

      // ✅ Generate slug (global entities use 'global-' prefix)
      let slug;
      if (isGlobal) {
        slug = `global-${entityName}`;
      } else if (finalProjectUUID) {
        slug = `${organizationId}-${finalProjectUUID}-${entityName}`;
      } else if (finalProjectId) {
        slug = `${organizationId}-${finalProjectId}-${entityName}`;
      } else {
        slug = `${organizationId}-${entityName}`;
      }

      const existing = await DynamicEntity.findOne({ slug });
      if (existing) {
        return res.status(409).json({
          error: `Entity "${entityName}" already exists`,
          existingSlug: existing.slug,
        });
      }

      // ✅ Create entity with global support
      const entity = await DynamicEntity.create({
        organizationId: isGlobal ? null : organizationId, // Global entities have no org
        projectId: finalProjectId,
        projectUUID: finalProjectUUID,
        entityName,
        slug,
        schema: new Map(Object.entries(schema)),
        operations: operations || [
          "create",
          "read",
          "update",
          "delete",
          "list",
        ],
        params: params || [],
        isGlobal: isGlobal, // ✅ NEW FIELD
        createdBy: userId,
      });

      // Auto-register API config
      const apiKey = `crud_${slug}`;
      await APIConfig.findOneAndUpdate(
        { key: apiKey },
        {
          key: apiKey,
          name: `Dynamic CRUD: ${entityName}`,
          description: `Auto-generated CRUD API for ${entityName}${isGlobal ? ' (Global)' : ''}`,
          type: "dynamic",
          baseUrl: `/api/crud/${organizationId || 'global'}/${entityName}`,
          methods: entity.operations.map((op) => op.toUpperCase()),
          isActive: true,
          projectUUID: isGlobal ? 'global' : finalProjectUUID,
          organizationId: isGlobal ? null : organizationId,
          authRequired: true,
          createdBy: userId,
          tags: ["dynamic", "crud", entityName].concat(isGlobal ? ["global"] : []),
        },
        { upsert: true, new: true },
      );

      console.log(`✅ Entity created: ${entityName} | slug: ${slug} | global: ${isGlobal}`);

      res.status(201).json({
        success: true,
        entity: {
          ...entity.toObject(),
          schema: Object.fromEntries(entity.schema),
        },
        apiEndpoint: `/api/crud/${organizationId || 'global'}/${entityName}`,
        apiConfigKey: apiKey,
      });
    } catch (error) {
      console.error("❌ defineEntity failed:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // ✅ CRUD HANDLER (Enhanced with permission checks + file array support + type conversion)
  static createCrudHandler(operation) {
    return async (req, res) => {
      try {
        const { organizationId, entityName } = req.params;
        const { userId, role, organizationId: userOrgId } = req.user;

        // ✅ Get entity definition (support both global and org-specific lookups)
        let entity = await DynamicEntity.findOne({
          organizationId,
          entityName,
        }).lean();

        // If not found and org is 'global', try to find global entity
        if (!entity && organizationId === 'global') {
          entity = await DynamicEntity.findOne({
            entityName,
            isGlobal: true,
          }).lean();
        }

        if (!entity) {
          return res
            .status(404)
            .json({ error: `Entity "${entityName}" not found` });
        }

        // ✅ Permission check for non-global entities
        if (!entity.isGlobal && role !== 'SUPER_ADMIN') {
          // Must belong to user's org
          if (entity.organizationId?.toString() !== userOrgId) {
            return res.status(403).json({
              error: "You don't have permission to access this entity",
            });
          }
        }

        // ✅ Read-only check for global entities (non-admins can only read/list)
        if (entity.isGlobal && operation !== 'list' && operation !== 'read') {
          if (role !== 'SUPER_ADMIN') {
            return res.status(403).json({
              error: "Global entities are read-only for non-admin users",
            });
          }
        }

        // Convert schema
        if (entity.schema && typeof entity.schema === "object") {
          if (entity.schema.$__ || entity.schema.constructor.name === "Map") {
            entity.schema = Object.fromEntries(
              Object.entries(entity.schema).filter(
                ([key]) => !key.startsWith("$"),
              ),
            );
          }
        }

        if (!entity.operations.includes(operation)) {
          return res.status(403).json({
            error: `Operation "${operation}" not allowed`,
          });
        }

        const Model = getDynamicModel(entity);
        const projectId = entity.projectId;
        const projectUUID = entity.projectUUID;

        switch (operation) {
          // ── LIST ───────────────────────────────────────
          case "list": {
            const query = entity.isGlobal ? {} : { organizationId: entity.organizationId };
            if (projectId) query.projectId = projectId;
            if (projectUUID) query.projectUUID = projectUUID;

            // ✅ PAGINATION PARAMETERS
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            // ✅ SEARCH FUNCTIONALITY
            if (req.query.search && req.query.search.trim()) {
              const searchTerm = req.query.search.trim();
              const searchRegex = new RegExp(searchTerm, "i");

              // Search across all string fields in schema
              const searchFields = [];
              Object.entries(entity.schema).forEach(
                ([fieldName, fieldSchema]) => {
                  if (
                    fieldSchema.type === "string" ||
                    fieldSchema.type === "enum"
                  ) {
                    searchFields.push({ [fieldName]: searchRegex });
                  }
                },
              );

              if (searchFields.length > 0) {
                query.$or = searchFields;
              }
            }

            // ✅ FILTERING BY SPECIFIC FIELDS
            Object.keys(req.query).forEach((key) => {
              // Skip pagination and search params
              if (["page", "limit", "search", "sort", "order"].includes(key))
                return;

              // Only filter by fields that exist in schema
              if (entity.schema[key]) {
                const fieldSchema = entity.schema[key];

                // Handle different field types
                if (fieldSchema.type === "number") {
                  // Support range queries for numbers
                  if (key.startsWith("min")) {
                    const fieldName = key.substring(3).toLowerCase();
                    if (entity.schema[fieldName]) {
                      query[fieldName] = {
                        ...query[fieldName],
                        $gte: parseFloat(req.query[key]),
                      };
                    }
                  } else if (key.startsWith("max")) {
                    const fieldName = key.substring(3).toLowerCase();
                    if (entity.schema[fieldName]) {
                      query[fieldName] = {
                        ...query[fieldName],
                        $lte: parseFloat(req.query[key]),
                      };
                    }
                  } else {
                    query[key] = parseFloat(req.query[key]);
                  }
                } else if (fieldSchema.type === "boolean") {
                  query[key] = req.query[key] === "true";
                } else {
                  query[key] = req.query[key];
                }
              }
            });

            // ✅ SORTING
            let sort = {};
            if (req.query.sort) {
              const sortField = req.query.sort;
              const sortOrder = req.query.order === "desc" ? -1 : 1;
              sort[sortField] = sortOrder;
            } else {
              sort = { createdAt: -1 }; // Default sort by newest first
            }

            console.log("📊 List Query:", JSON.stringify(query, null, 2));
            console.log("📄 Pagination:", { page, limit, skip });
            console.log("🔀 Sort:", sort);

            // ✅ GET TOTAL COUNT (for pagination info)
            const total = await Model.countDocuments(query);

            // ✅ GET PAGINATED DATA
            const items = await Model.find(query)
              .sort(sort)
              .skip(skip)
              .limit(limit)
              .lean();

            // Transform file fields to include full URLs
            const itemsWithUrls = items.map((item) =>
              transformFileFields(item, entity.schema, req),
            );

            // ✅ RETURN PAGINATED RESPONSE
            return res.json({
              success: true,
              data: itemsWithUrls,
              pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1,
              },
            });
          }

          // ── CREATE ─────────────────────────────────────
          case "create": {
            let recordData = { ...req.body };

            // ✅ Process uploaded files (single and arrays)
            if (req.files) {
              const filesByField = {};

              req.files.forEach((file) => {
                const isArrayField = file.fieldname.endsWith("[]");
                const fieldName = isArrayField
                  ? file.fieldname.slice(0, -2)
                  : file.fieldname;

                const fileObj = {
                  url: `/uploads/dynamic/${file.filename}`,
                  filename: file.filename,
                  originalName: file.originalname,
                  mimetype: file.mimetype,
                  size: file.size,
                };

                if (isArrayField) {
                  if (!filesByField[fieldName]) {
                    filesByField[fieldName] = [];
                  }
                  filesByField[fieldName].push(fileObj);
                } else {
                  filesByField[fieldName] = fileObj;
                }
              });

              Object.assign(recordData, filesByField);
            }

            // ✅ Convert types based on schema (fixes the number issue!)
            recordData = processRecordData(recordData, entity.schema);

            const validation = DynamicCrudController.validateRecord(
              recordData,
              entity.schema,
              false,
            );
            if (!validation.valid) {
              return res.status(400).json({
                error: "Validation failed",
                details: validation.errors,
              });
            }

            const record = new Model({
              ...recordData,
              projectId: projectId || null,
              projectUUID: projectUUID || null,
              organizationId: entity.isGlobal ? null : entity.organizationId,
              createdBy: userId,
            });

            await record.save();

            const recordWithUrls = transformFileFields(
              record.toObject(),
              entity.schema,
              req,
            );

            return res.status(201).json({
              success: true,
              record: recordWithUrls,
            });
          }

          // ── READ ONE ───────────────────────────────────
          case "read": {
            const { recordId } = req.params;
            if (!mongoose.isValidObjectId(recordId)) {
              return res.status(400).json({ error: "Invalid record ID" });
            }

            const query = { _id: recordId };
            if (!entity.isGlobal) query.organizationId = entity.organizationId;
            if (projectId) query.projectId = projectId;
            if (projectUUID) query.projectUUID = projectUUID;

            const record = await Model.findOne(query).lean();

            if (!record) {
              return res.status(404).json({ error: "Record not found" });
            }

            const recordWithUrls = transformFileFields(
              record,
              entity.schema,
              req,
            );

            return res.json({ success: true, record: recordWithUrls });
          }

          // ── UPDATE ─────────────────────────────────────
          case "update": {
            const { recordId } = req.params;
            if (!mongoose.isValidObjectId(recordId)) {
              return res.status(400).json({ error: "Invalid record ID" });
            }

            let updateData = { ...req.body };

            // ✅ Process uploaded files (single and arrays)
            if (req.files) {
              const filesByField = {};

              req.files.forEach((file) => {
                const isArrayField = file.fieldname.endsWith("[]");
                const fieldName = isArrayField
                  ? file.fieldname.slice(0, -2)
                  : file.fieldname;

                const fileObj = {
                  url: `/uploads/dynamic/${file.filename}`,
                  filename: file.filename,
                  originalName: file.originalname,
                  mimetype: file.mimetype,
                  size: file.size,
                };

                if (isArrayField) {
                  if (!filesByField[fieldName]) {
                    filesByField[fieldName] = [];
                  }
                  filesByField[fieldName].push(fileObj);
                } else {
                  filesByField[fieldName] = fileObj;
                }
              });

              Object.assign(updateData, filesByField);
            }

            // ✅ Convert types based on schema (fixes the number issue!)
            updateData = processRecordData(updateData, entity.schema);

            const validation = DynamicCrudController.validateRecord(
              updateData,
              entity.schema,
              true,
            );
            if (!validation.valid) {
              return res.status(400).json({
                error: "Validation failed",
                details: validation.errors,
              });
            }

            const query = { _id: recordId };
            if (!entity.isGlobal) query.organizationId = entity.organizationId;
            if (projectId) query.projectId = projectId;
            if (projectUUID) query.projectUUID = projectUUID;

            const updated = await Model.findOneAndUpdate(
              query,
              { ...updateData, updatedBy: userId },
              { new: true, runValidators: true, lean: true },
            );

            if (!updated) {
              return res.status(404).json({ error: "Record not found" });
            }

            const updatedWithUrls = transformFileFields(
              updated,
              entity.schema,
              req,
            );

            return res.json({ success: true, record: updatedWithUrls });
          }

          // ── DELETE ─────────────────────────────────────
          case "delete": {
            const { recordId } = req.params;
            if (!mongoose.isValidObjectId(recordId)) {
              return res.status(400).json({ error: "Invalid record ID" });
            }

            const query = { _id: recordId };
            if (!entity.isGlobal) query.organizationId = entity.organizationId;
            if (projectId) query.projectId = projectId;
            if (projectUUID) query.projectUUID = projectUUID;

            const deleted = await Model.findOneAndDelete(query);

            if (!deleted) {
              return res.status(404).json({ error: "Record not found" });
            }

            // ✅ Delete associated files (single and arrays)
            Object.keys(entity.schema).forEach(async (fieldName) => {
              const fieldSchema = entity.schema[fieldName];

              // Single file
              if (fieldSchema.type === "file" && deleted[fieldName]?.filename) {
                const filePath = path.join(
                  __dirname,
                  "../uploads/dynamic",
                  deleted[fieldName].filename,
                );
                try {
                  await fs.unlink(filePath);
                  console.log(
                    `🗑️ Deleted file: ${deleted[fieldName].filename}`,
                  );
                } catch (err) {
                  console.error(`Failed to delete file: ${err.message}`);
                }
              }

              // File array
              if (
                fieldSchema.type === "array" &&
                fieldSchema.items?.type === "file" &&
                Array.isArray(deleted[fieldName])
              ) {
                for (const file of deleted[fieldName]) {
                  if (file.filename) {
                    const filePath = path.join(
                      __dirname,
                      "../uploads/dynamic",
                      file.filename,
                    );
                    try {
                      await fs.unlink(filePath);
                      console.log(`🗑️ Deleted file: ${file.filename}`);
                    } catch (err) {
                      console.error(`Failed to delete file: ${err.message}`);
                    }
                  }
                }
              }
            });

            return res.json({
              success: true,
              message: "Record deleted",
              deletedId: recordId,
            });
          }

          default:
            return res.status(400).json({ error: "Invalid operation" });
        }
      } catch (error) {
        console.error(`[${operation.toUpperCase()}] Error:`, error);
        res.status(500).json({
          error: "Internal server error",
          message: error.message,
        });
      }
    };
  }

  // ✅ VALIDATION (Enhanced)
  static validateRecord(data, schemaMap, isPartial = false) {
    const errors = {};

    let schemaEntries;
    if (schemaMap instanceof Map) {
      schemaEntries = Array.from(schemaMap.entries());
    } else if (typeof schemaMap === "object") {
      schemaEntries = Object.entries(schemaMap);
    } else {
      return { valid: false, errors: { schema: "Invalid schema format" } };
    }

    for (const [fieldName, fieldSchema] of schemaEntries) {
      const value = data[fieldName];

      if (
        fieldSchema.required &&
        !isPartial &&
        (value === undefined || value === null)
      ) {
        errors[fieldName] = `${fieldName} is required`;
        continue;
      }

      if (value !== undefined && value !== null) {
        // Type-specific validation
        if (fieldSchema.type === "number" && typeof value !== "number") {
          errors[fieldName] = `${fieldName} must be a number`;
        }
        if (fieldSchema.type === "string" && typeof value !== "string") {
          errors[fieldName] = `${fieldName} must be a string`;
        }
        if (
          fieldSchema.type === "enum" &&
          fieldSchema.validation?.enum &&
          !fieldSchema.validation.enum.includes(value)
        ) {
          errors[fieldName] =
            `${fieldName} must be one of: ${fieldSchema.validation.enum.join(", ")}`;
        }

        // Validation rules
        if (fieldSchema.validation) {
          const val = fieldSchema.validation;
          if (val.min !== undefined && value < val.min) {
            errors[fieldName] = `${fieldName} must be at least ${val.min}`;
          }
          if (val.max !== undefined && value > val.max) {
            errors[fieldName] = `${fieldName} must be at most ${val.max}`;
          }
          if (
            val.minLength !== undefined &&
            String(value).length < val.minLength
          ) {
            errors[fieldName] =
              `${fieldName} must be at least ${val.minLength} characters`;
          }
          if (
            val.maxLength !== undefined &&
            String(value).length > val.maxLength
          ) {
            errors[fieldName] =
              `${fieldName} must be at most ${val.maxLength} characters`;
          }
        }
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }

  // ✅ UPDATE ENTITY (Enhanced with permission check)
  static async updateEntity(req, res) {
    try {
      const { entityId } = req.params;
      const { entityName, schema, operations } = req.body;
      const { organizationId, userId, role } = req.user;

      if (!mongoose.isValidObjectId(entityId)) {
        return res.status(400).json({ error: "Invalid entity ID" });
      }

      const entity = await DynamicEntity.findById(entityId);

      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }

      // ✅ Permission check
      if (role !== 'SUPER_ADMIN') {
        // Cannot edit global entities
        if (entity.isGlobal) {
          return res.status(403).json({
            error: "Only SUPER_ADMIN can update global entities",
          });
        }
        
        // Can only edit own org's entities
        if (entity.organizationId?.toString() !== organizationId) {
          return res.status(403).json({
            error: "You can only update entities from your organization",
          });
        }
      }

      if (entityName && entityName !== entity.entityName) {
        if (!/^[a-z][a-z0-9_]*$/.test(entityName)) {
          return res.status(400).json({
            error: "Invalid entityName (lowercase, numbers, underscores only)",
          });
        }

        const projectIdentifier =
          entity.projectUUID || entity.projectId?.toString() || "";
        const newSlug = entity.isGlobal 
          ? `global-${entityName}`
          : (projectIdentifier
            ? `${organizationId}-${projectIdentifier}-${entityName}`
            : `${organizationId}-${entityName}`);

        const existing = await DynamicEntity.findOne({
          slug: newSlug,
          _id: { $ne: entityId },
        });

        if (existing) {
          return res.status(409).json({
            error: `Entity "${entityName}" already exists`,
          });
        }

        entity.entityName = entityName;
        entity.slug = newSlug;
      }

      if (schema) {
        entity.schema = new Map(Object.entries(schema));
      }

      if (operations) {
        entity.operations = operations;
      }

      entity.updatedBy = userId;
      await entity.save();

      if (modelCache.has(entity.slug)) {
        modelCache.delete(entity.slug);
        console.log(`🗑️ Cleared model cache for ${entity.slug}`);
      }

      const apiKey = `crud_${entity.slug}`;
      await APIConfig.findOneAndUpdate(
        { key: apiKey },
        {
          name: `Dynamic CRUD: ${entity.entityName}`,
          baseUrl: `/api/crud/${entity.organizationId || 'global'}/${entity.entityName}`,
          methods: entity.operations.map((op) => op.toUpperCase()),
          updatedBy: userId,
        },
      );

      console.log(`✅ Entity updated: ${entity.entityName}`);

      res.json({
        success: true,
        entity: {
          ...entity.toObject(),
          schema: Object.fromEntries(entity.schema),
        },
        message: "Entity updated successfully",
      });
    } catch (error) {
      console.error("❌ updateEntity failed:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // ✅ DELETE ENTITY (Enhanced with permission check)
  static async deleteEntity(req, res) {
    try {
      const { entityId } = req.params;
      const { organizationId, role } = req.user;

      if (!mongoose.isValidObjectId(entityId)) {
        return res.status(400).json({ error: "Invalid entity ID" });
      }

      const entity = await DynamicEntity.findById(entityId);

      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }

      // ✅ Permission check
      if (role !== 'SUPER_ADMIN') {
        // Cannot delete global entities
        if (entity.isGlobal) {
          return res.status(403).json({
            error: "Only SUPER_ADMIN can delete global entities",
          });
        }
        
        // Can only delete own org's entities
        if (entity.organizationId?.toString() !== organizationId) {
          return res.status(403).json({
            error: "You can only delete entities from your organization",
          });
        }
      }

      const Model = getDynamicModel(entity);
      const recordCount = await Model.countDocuments();

      if (recordCount > 0) {
        return res.status(400).json({
          error: `Cannot delete entity "${entity.entityName}". It has ${recordCount} existing records. Delete all records first.`,
          recordCount,
        });
      }

      await DynamicEntity.deleteOne({ _id: entityId });

      if (modelCache.has(entity.slug)) {
        modelCache.delete(entity.slug);
      }

      const apiKey = `crud_${entity.slug}`;
      await APIConfig.deleteOne({ key: apiKey });

      console.log(`🗑️ Entity deleted: ${entity.entityName}`);

      res.json({
        success: true,
        message: `Entity "${entity.entityName}" deleted successfully`,
        deletedEntity: entity.entityName,
      });
    } catch (error) {
      console.error("❌ deleteEntity failed:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // ✅ GET SINGLE ENTITY SCHEMA (Enhanced with permission check)
  static async getEntity(req, res) {
    try {
      const { entityName, organizationId } = req.params;
      const { role, organizationId: userOrgId } = req.user;

      console.log(`📋 Fetching schema for: ${entityName} (Org: ${organizationId})`);

      let entity = await DynamicEntity.findOne({
        entityName,
        organizationId
      });

      // If not found and org is 'global', try to find global entity
      if (!entity && organizationId === 'global') {
        entity = await DynamicEntity.findOne({
          entityName,
          isGlobal: true,
        });
      }

      if (!entity) {
        return res.status(404).json({ 
          error: "Entity not found",
          entityName,
          organizationId 
        });
      }

      // ✅ Permission check
      if (!entity.isGlobal && role !== 'SUPER_ADMIN') {
        if (entity.organizationId?.toString() !== userOrgId) {
          return res.status(403).json({
            error: "You don't have permission to access this entity",
          });
        }
      }

      const schemaObject = Object.fromEntries(entity.schema);

      console.log(`✅ Schema found:`, Object.keys(schemaObject));

      res.json({
        success: true,
        entityName: entity.entityName,
        schema: schemaObject,
        operations: entity.operations,
        isGlobal: entity.isGlobal || false,
      });
    } catch (error) {
      console.error("❌ getEntity failed:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

// ───────────────────────────────────────────────
//  HELPER: Transform file fields to full URLs (handles arrays)
// ───────────────────────────────────────────────
function transformFileFields(record, schema, req) {
  const result = { ...record };
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  Object.keys(schema).forEach((fieldName) => {
    const fieldSchema = schema[fieldName];

    // Single file
    if (fieldSchema.type === "file" && result[fieldName]?.url) {
      result[fieldName].url = result[fieldName].url.startsWith("http")
        ? result[fieldName].url
        : `${baseUrl}${result[fieldName].url}`;
    }

    // File array
    if (
      fieldSchema.type === "array" &&
      fieldSchema.items?.type === "file" &&
      Array.isArray(result[fieldName])
    ) {
      result[fieldName] = result[fieldName].map((file) => ({
        ...file,
        url: file.url.startsWith("http") ? file.url : `${baseUrl}${file.url}`,
      }));
    }
  });

  return result;
}

module.exports = DynamicCrudController;
module.exports.upload = upload;
module.exports.modelCache = modelCache;