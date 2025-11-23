const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  table: { type: Object, default: {} },
  modal: { type: Object, default: {} },
  uiSchema: { type: Object, default: {} },
  styles: { type: Object, default: {} },
  triggers: { type: Array, default: [] }
}, { _id: false });

// 🆕 Sub-page Schema
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
  
  initialization: {
    globalCSS: { type: String, default: "" },
    // 🔥 UPDATED: Accept both strings (API keys) AND objects (full config)
    resources: [mongoose.Schema.Types.Mixed]
  },
  
  // 🆕 Sub-pages
  pages: {
    type: Map,
    of: SubPageSchema,
    default: {}
  },
  
  // Main page components
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

module.exports = mongoose.model('PageConfig', PageConfigSchema);