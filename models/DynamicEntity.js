// backend/models/DynamicEntity.js - FIXED VERSION

const mongoose = require('mongoose');

const DynamicEntitySchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false, // False to support global entities
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
  params: {
    type: mongoose.Schema.Types.Mixed,
    default: []
  },
  
  // ✅ Global entities (accessible to all orgs)
  isGlobal: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // ✅ NEW: Public access flag for website-tier
  // When true: No authentication required for website visitors
  // When false: Requires END_USER_ADMIN authentication
  isPublic: {
    type: Boolean,
    default: true, // Default to public for backwards compatibility
    index: true
  },
  
  // ✅ NEW: Access control metadata
  accessControl: {
    // Who can read (list, get)?
    readAccess: {
      type: String,
      enum: ['PUBLIC', 'END_USER', 'END_USER_ADMIN', 'PLATFORM'],
      default: 'PUBLIC'
    },
    // Who can create?
    createAccess: {
      type: String,
      enum: ['PUBLIC', 'END_USER', 'END_USER_ADMIN', 'PLATFORM'],
      default: 'PUBLIC'
    },
    // Who can update?
    updateAccess: {
      type: String,
      enum: ['PUBLIC', 'END_USER', 'END_USER_ADMIN', 'PLATFORM'],
      default: 'END_USER_ADMIN'
    },
    // Who can delete?
    deleteAccess: {
      type: String,
      enum: ['PUBLIC', 'END_USER', 'END_USER_ADMIN', 'PLATFORM'],
      default: 'END_USER_ADMIN'
    }
  },
  
  // ✅ Description for documentation
  description: {
    type: String,
    default: ''
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
DynamicEntitySchema.index({ isPublic: 1 });
DynamicEntitySchema.index({ slug: 1 }, { unique: true });

// ✅ Virtual: Get full access level
DynamicEntitySchema.virtual('accessLevel').get(function() {
  if (this.isGlobal) return 'GLOBAL';
  if (this.isPublic) return 'PUBLIC';
  return 'PROTECTED';
});

// ✅ Method: Check if operation is allowed for role
DynamicEntitySchema.methods.canAccess = function(operation, userRole) {
  // Platform roles always have access
  if (['SUPER_ADMIN', 'CLIENT_ADMIN', 'DEVELOPER'].includes(userRole)) {
    return true;
  }

  // Check specific access control
  const accessKey = `${operation}Access`;
  const requiredAccess = this.accessControl?.[accessKey] || 'PUBLIC';

  const accessHierarchy = {
    'PUBLIC': 0,
    'END_USER': 1,
    'END_USER_ADMIN': 2,
    'PLATFORM': 3
  };

  const userAccessLevel = accessHierarchy[userRole] || 0;
  const requiredAccessLevel = accessHierarchy[requiredAccess] || 0;

  return userAccessLevel >= requiredAccessLevel;
};

module.exports = mongoose.model('DynamicEntity', DynamicEntitySchema);