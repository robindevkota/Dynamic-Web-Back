// utils/dynamicModelFactory.js
const mongoose = require('mongoose');
const modelCache = new Map();

// utils/dynamicModelFactory.js or inside controller

function getDynamicModel(entity) {
  const cacheKey = entity.slug;

  if (modelCache.has(cacheKey)) {
    return modelCache.get(cacheKey);
  }

  const schemaDefinition = {
    // ✅ Make all context fields optional in data records
    projectId: { 
      type: mongoose.Schema.Types.ObjectId, 
      index: true,
      default: null
    },
    projectUUID: {
      type: String,
      index: true,
      default: null
    },
    organizationId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true,  // ✅ This should still be required
      index: true 
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  };

  for (const [fieldName, fieldDef] of entity.schema) {
    const fieldSchema = {
      type: mapFieldType(fieldDef.type),
      required: fieldDef.required || false,
      default: fieldDef.default !== undefined ? fieldDef.default : undefined
    };

    if (fieldDef.validation) {
      if (fieldDef.validation.min !== undefined) fieldSchema.min = fieldDef.validation.min;
      if (fieldDef.validation.max !== undefined) fieldSchema.max = fieldDef.validation.max;
    }

    schemaDefinition[fieldName] = fieldSchema;
  }

  const schema = new mongoose.Schema(schemaDefinition, {
    timestamps: true,
    collection: `dyn_${entity.slug.replace(/[^a-zA-Z0-9_]/g, '_')}`
  });

  const Model = mongoose.model(`Dynamic_${entity.slug.replace(/[^a-zA-Z0-9_]/g, '_')}`, schema);
  modelCache.set(cacheKey, Model);

  return Model;
}

function mapFieldType(type) {
  const map = {
    string: String,
    number: Number,
    boolean: Boolean,
    date: Date,
    array: [mongoose.Schema.Types.Mixed],
    object: mongoose.Schema.Types.Mixed
    // later: file → String (url), relation → ObjectId
  };
  return map[type] || String;
}

module.exports = { getDynamicModel };