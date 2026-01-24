// models/DynamicEntity.js
const mongoose = require('mongoose');

// models/DynamicEntity.js

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
    of: {
      type: { type: String, required: true },
      required: { type: Boolean, default: false },
      default: mongoose.Schema.Types.Mixed,
      validation: {
        min: Number,
        max: Number,
        minLength: Number,
        maxLength: Number,
        pattern: String
      }
    },
    required: true
  },
  operations: {
    type: [String],
    enum: ['create', 'read', 'update', 'delete', 'list'],
    default: ['create', 'read', 'update', 'delete', 'list']
  },
  
  // ✅ All project fields are now OPTIONAL
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    index: true,
    default: null  // ✅ Can be null
  },
  projectUUID: {
    type: String,
    index: true,
    default: null  // ✅ Can be null
  },
  
  // Organization is still required
  organizationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,  // ✅ This is required
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

// ✅ Update indexes
dynamicEntitySchema.index({ organizationId: 1, entityName: 1 });
dynamicEntitySchema.index({ organizationId: 1, projectUUID: 1 });
dynamicEntitySchema.index({ organizationId: 1, projectId: 1 });
dynamicEntitySchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('DynamicEntity', dynamicEntitySchema);