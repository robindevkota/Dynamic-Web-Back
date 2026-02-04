// backend/models/Organization.js - ENHANCED with Status

const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  // ✅ NEW: Organization-level status
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'TRIAL'],
    default: 'ACTIVE',
    index: true
  },
  
  // ✅ NEW: Track why organization was deactivated
  deactivationReason: {
    type: String,
    enum: ['PAYMENT_FAILED', 'TRIAL_EXPIRED', 'MANUAL', 'POLICY_VIOLATION'],
    default: null
  },
  
  // ✅ NEW: When and by whom was it deactivated
  deactivatedAt: {
    type: Date,
    default: null
  },
  deactivatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Subscription & Billing
  pricingPlan: {
    type: String,
    enum: ['FREE', 'STARTER', 'PRO', 'ENTERPRISE'],
    default: 'FREE'
  },
  subscriptionStatus: {
    type: String,
    enum: ['ACTIVE', 'PAST_DUE', 'CANCELED', 'TRIAL'],
    default: 'TRIAL'
  },
  subscriptionEndsAt: {
    type: Date
  },
  trialEndsAt: {
    type: Date
  },
  
  // Limits
  maxProjects: {
    type: Number,
    default: 5
  },
  maxUsers: {
    type: Number,
    default: 10
  },
  maxStorage: {
    type: Number,
    default: 1024 // MB
  },
  
  // Current Usage
  currentProjects: {
    type: Number,
    default: 0
  },
  currentUsers: {
    type: Number,
    default: 0
  },
  currentStorage: {
    type: Number,
    default: 0
  },
  
  // Contact Information
  contactEmail: {
    type: String
  },
  supportEmail: {
    type: String
  },
  billingEmail: {
    type: String
  },
  
  // Address (optional)
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  
  // Settings
  settings: {
    allowPublicSignup: {
      type: Boolean,
      default: false
    },
    customDomain: {
      type: String,
      default: null
    },
    logoUrl: {
      type: String,
      default: null
    },
    brandColor: {
      type: String,
      default: '#1890ff'
    }
  }
  
}, {
  timestamps: true
});

// ✅ Indexes for efficient queries
OrganizationSchema.index({ slug: 1 }, { unique: true });
OrganizationSchema.index({ status: 1 });
OrganizationSchema.index({ pricingPlan: 1 });
OrganizationSchema.index({ subscriptionStatus: 1 });

// ✅ Virtual: Is organization accessible?
OrganizationSchema.virtual('isAccessible').get(function() {
  return this.status === 'ACTIVE' || this.status === 'TRIAL';
});

// ✅ Method: Check if organization has capacity for new project
OrganizationSchema.methods.canAddProject = function() {
  return this.currentProjects < this.maxProjects;
};

// ✅ Method: Check if organization has capacity for new user
OrganizationSchema.methods.canAddUser = function() {
  return this.currentUsers < this.maxUsers;
};

// ✅ Method: Check if trial has expired
OrganizationSchema.methods.isTrialExpired = function() {
  if (!this.trialEndsAt) return false;
  return new Date() > this.trialEndsAt;
};

module.exports = mongoose.model('Organization', OrganizationSchema);