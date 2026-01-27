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
  }
}, { 
  timestamps: true 
});

dynamicEntitySchema.index({ organizationId: 1, entityName: 1 });
dynamicEntitySchema.index({ organizationId: 1, projectUUID: 1 });
dynamicEntitySchema.index({ organizationId: 1, projectId: 1 });
dynamicEntitySchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('DynamicEntity', dynamicEntitySchema);