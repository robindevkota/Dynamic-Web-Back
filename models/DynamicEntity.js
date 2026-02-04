// backend/models/DynamicEntity.js

const mongoose = require('mongoose');

const DynamicEntitySchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false, // ✅ Changed to false to support global entities
    index: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    index: true
  },
  projectUUID: {
    type: String,
    required: false,
    index: true
  },
  entityName: {
    type: String,
    required: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
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
  // ✅ SIMPLIFIED: Just use Mixed type for params - no complex schema
  params: {
    type: mongoose.Schema.Types.Mixed,
    default: []
  },
  // ✅ NEW FIELD: Mark entity as global (accessible to all orgs)
  isGlobal: {
    type: Boolean,
    default: false,
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

// ✅ Indexes for efficient querying
DynamicEntitySchema.index({ organizationId: 1, entityName: 1 });
DynamicEntitySchema.index({ isGlobal: 1, entityName: 1 });
DynamicEntitySchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('DynamicEntity', DynamicEntitySchema);