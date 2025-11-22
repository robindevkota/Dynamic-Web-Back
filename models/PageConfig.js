// models/PageConfig.js
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  key: { type: String, required: true },
  url: { type: String, required: true },
});

const PageConfigSchema = new mongoose.Schema({
  // === Fields shown in your Antd table ===
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  projectUUID: { type: String },
  taskUUID: { type: String },
  status: { type: String, enum: ['Active', 'Draft', 'Deleted'], default: 'Draft' },
  accountValidation: { type: Boolean, default: false },
  otpValidation: { type: Boolean, default: false },
  isAnonymous: { type: Boolean, default: false },

  // === Dynamic website config ===
  initialization: {
    resources: [ResourceSchema],
    conditions: { type: String }, // JSON string for now
  },
  components: { type: mongoose.Schema.Types.Mixed }, // Full nested JSON (navbar, sidebar, etc.)
  assembly: { type: mongoose.Schema.Types.Mixed },

  // === Metadata ===
  version: { type: Number, default: 1 },
  publishedAt: { type: Date },
  createdBy: { type: String },
}, { timestamps: true });

// Index for fast lookup by slug
PageConfigSchema.index({ slug: 1 });

module.exports = mongoose.model('PageConfig', PageConfigSchema);