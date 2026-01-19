const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pricingPlan: { 
    type: String, 
    enum: ["starter", "professional", "enterprise"], 
    required: true 
  },
  maxUsers: { type: Number, default: 4 },    // Will be set based on plan
  maxProjects: { type: Number, default: 4 }, // Will be set based on plan
}, { timestamps: true });

module.exports = mongoose.model("Organization", organizationSchema);
