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
  status: { type: String, enum: ['Active', 'Draft', 'Deleted'], default: 'Draft' },
  accountValidation: { type: Boolean, default: false },
  otpValidation: { type: Boolean, default: false },
  isAnonymous: { type: Boolean, default: true },
  
  // ✅ NEW: Ownership & Permissions
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

// Index for efficient queries
PageConfigSchema.index({ organizationId: 1, status: 1 });
PageConfigSchema.index({ isTemplate: 1, status: 1 });

module.exports = mongoose.model('PageConfig', PageConfigSchema);