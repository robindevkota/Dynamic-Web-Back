// models/DynamicEntity.js
const mongoose = require('mongoose');

const dynamicEntitySchema = new mongoose.Schema({
  entityName: { 
    type: String, 
    required: true,
    match: /^[a-z][a-z0-9_]*$/,
    lowercase: true
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  schema: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },
  operations: {
    type: [String],
    enum: ['create', 'read', 'update', 'delete', 'list'],
    default: ['create', 'read', 'update', 'delete', 'list']
  },
  params: {
    type: mongoose.Schema.Types.Mixed,  // ✅ Simplest solution
    default: []
  },
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
    required: true,
    index: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  updatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  // ✅ NEW: Template/Demo support
  isTemplate: {
    type: Boolean,
    default: false,
    index: true
  },
  templateCategory: {
    type: String,
    enum: ['E-commerce', 'Hotel', 'CRM', 'Inventory', 'HR', 'Custom', null],
    default: null
  }
}, { 
  timestamps: true 
});

// Existing indexes
dynamicEntitySchema.index({ organizationId: 1, entityName: 1 });
dynamicEntitySchema.index({ organizationId: 1, projectUUID: 1 });
dynamicEntitySchema.index({ organizationId: 1, projectId: 1 });
dynamicEntitySchema.index({ slug: 1 }, { unique: true });

// ✅ NEW: Template index for filtering
dynamicEntitySchema.index({ isTemplate: 1, templateCategory: 1 });

// ✅ NEW: Static method for demo org ID
dynamicEntitySchema.statics.DEMO_ORG_ID = '000000000000000000000001';
dynamicEntitySchema.statics.DEMO_USER_ID = '000000000000000000000000';

// ✅ NEW: Helper to create demo/template entities
dynamicEntitySchema.statics.createDemoEntity = async function(entityData) {
  const DemoOrgId = this.DEMO_ORG_ID;
  const DemoUserId = this.DEMO_USER_ID;
  
  return this.create({
    ...entityData,
    organizationId: new mongoose.Types.ObjectId(DemoOrgId),
    createdBy: new mongoose.Types.ObjectId(DemoUserId),
    isTemplate: true,
    // Auto-generate slug if not provided
    slug: entityData.slug || `${DemoOrgId}-${entityData.projectUUID || 'demo'}-${entityData.entityName}`
  });
};

// ✅ NEW: Helper to check if entity is demo
dynamicEntitySchema.methods.isDemo = function() {
  return this.organizationId.toString() === this.constructor.DEMO_ORG_ID;
};

// ✅ NEW: Helper to clone template as real entity
dynamicEntitySchema.statics.cloneTemplate = async function(templateId, targetOrgId, userId) {
  const template = await this.findById(templateId).lean();
  
  if (!template || !template.isTemplate) {
    throw new Error('Template not found or not a template');
  }
  
  // Remove MongoDB-specific fields
  delete template._id;
  delete template.createdAt;
  delete template.updatedAt;
  delete template.__v;
  
  // Create new entity for target organization
  const newSlug = `${targetOrgId}-${template.projectUUID || 'cloned'}-${template.entityName}`;
  
  return this.create({
    ...template,
    organizationId: targetOrgId,
    createdBy: userId,
    slug: newSlug,
    isTemplate: false // Cloned entity is not a template
  });
};

// ✅ NEW: Query helper to find templates
dynamicEntitySchema.statics.findTemplates = function(category = null) {
  const query = { isTemplate: true };
  if (category) {
    query.templateCategory = category;
  }
  return this.find(query).sort({ templateCategory: 1, entityName: 1 });
};

// ✅ NEW: Pre-save hook to validate demo entities
dynamicEntitySchema.pre('save', function(next) {
  // If it's a demo entity, ensure it's marked as template
  if (this.organizationId.toString() === this.constructor.DEMO_ORG_ID) {
    this.isTemplate = true;
  }
  next();
});

module.exports = mongoose.model('DynamicEntity', dynamicEntitySchema);