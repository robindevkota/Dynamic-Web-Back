const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  table: { type: Object, default: {} },      // 🆕 Table configuration
  modal: { type: Object, default: {} },      // 🆕 Modal configuration
  uiSchema: { type: Object, default: {} },   // UI widgets config
  styles: { type: Object, default: {} },     // Component styles
  triggers: { type: Array, default: [] }     // Event triggers
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
    resources: [{
      key: String,
      url: String
    }]
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

module.exports = mongoose.model('PageConfig', PageConfigSchema);