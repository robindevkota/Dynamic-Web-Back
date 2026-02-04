// backend/models/PageConfig.js - COMPLETE WITH PROJECT STATUS

const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  _id: { type: String },
  $ref: { type: String },
  table: { type: Object, default: {} },
  modal: { type: Object, default: {} },
  uiSchema: { type: Object, default: {} },
  styles: { type: Object, default: {} },
  triggers: { type: Array, default: [] }
}, { _id: false, strict: false });

const SubPageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  components: {
    navbar: ComponentSchema,
    sidebar: ComponentSchema,
    main: ComponentSchema,
    modals: ComponentSchema,
    footer: ComponentSchema
  }
}, { _id: false });

const PageConfigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  projectUUID: { type: String, default: "" },
  taskUUID: { type: String, default: "" },
  
  // ✅ EXISTING: Publication status (Draft/Published/Deleted)
  status: { 
    type: String, 
    enum: ['Active', 'Draft', 'Deleted'], 
    default: 'Draft' 
  },
  
  // ✅ NEW: Project-level status (ACTIVE/INACTIVE for access control)
  projectStatus: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'ARCHIVED', 'MAINTENANCE'],
    default: 'ACTIVE',
    index: true
  },
  
  // ✅ NEW: Track why project was deactivated
  projectDeactivationReason: {
    type: String,
    enum: ['MANUAL', 'CLIENT_NONPAYMENT', 'MAINTENANCE', 'ARCHIVED', 'POLICY_VIOLATION'],
    default: null
  },
  
  // ✅ NEW: When and by whom was project deactivated
  projectDeactivatedAt: {
    type: Date,
    default: null
  },
  projectDeactivatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // ✅ NEW: Maintenance mode message
  maintenanceMessage: {
    type: String,
    default: null
  },
  
  accountValidation: { type: Boolean, default: false },
  otpValidation: { type: Boolean, default: false },
  isAnonymous: { type: Boolean, default: true },
  
  // ✅ Ownership & Permissions
  organizationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Organization",
    required: false // null = SUPER_ADMIN template
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  isTemplate: { 
    type: Boolean, 
    default: false // true = starter template (read-only for clients)
  },
  templateCategory: {
    type: String,
    enum: ['E-commerce', 'Portfolio', 'Blog', 'Dashboard', 'Landing Page', 'Other'],
    default: 'Other'
  },
  
  initialization: {
    globalCSS: { type: String, default: "" },
    resources: [mongoose.Schema.Types.Mixed],
    actions: { type: Object, default: {} }
  },
  
  pages: {
    type: Map,
    of: SubPageSchema,
    default: {}
  },
  
  components: {
    navbar: ComponentSchema,
    sidebar: ComponentSchema,
    main: ComponentSchema,
    modals: ComponentSchema,
    footer: ComponentSchema
  },
  
  version: { type: Number, default: 1 }
}, { 
  timestamps: true 
});

// ✅ Indexes for efficient queries
PageConfigSchema.index({ slug: 1 }, { unique: true });
PageConfigSchema.index({ organizationId: 1, status: 1 });
PageConfigSchema.index({ isTemplate: 1, status: 1 });
PageConfigSchema.index({ projectStatus: 1 }); // ✅ NEW
PageConfigSchema.index({ organizationId: 1, projectStatus: 1 }); // ✅ NEW

// ✅ Virtual: Is project accessible?
PageConfigSchema.virtual('isAccessible').get(function() {
  return this.projectStatus === 'ACTIVE';
});

module.exports = mongoose.model('PageConfig', PageConfigSchema);