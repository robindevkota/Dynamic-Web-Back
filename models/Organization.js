// backend/models/Organization.js

const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  
  // Owner reference
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: false,
    index: true 
  },
  
  pricingPlan: { 
    type: String, 
    enum: ["starter", "professional", "enterprise"], 
    required: true 
  },
  
  // Plan limits
  maxUsers: { type: Number, required: true },
  maxProjects: { type: Number, required: true },
  
  // Current usage
  currentUsers: { type: Number, default: 1 }, // Owner counts as 1
  currentProjects: { type: Number, default: 0 },
  
  // ✅ ADD BILLING FIELDS
  billing: {
    status: {
      type: String,
      enum: ["TRIAL", "ACTIVE", "PAST_DUE", "CANCELED"],
      default: "TRIAL"
    },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    
    // Trial period (14 days)
    trialStartDate: { type: Date },
    trialEndDate: { type: Date },
    
    // Subscription
    subscriptionStartDate: { type: Date },
    currentPeriodEnd: { type: Date },
    cancelAtPeriodEnd: { type: Boolean, default: false },
    
    // Payment history
    lastPaymentDate: { type: Date },
    lastPaymentAmount: { type: Number },
    nextPaymentDate: { type: Date }
  },
  
  // Settings
  settings: {
    whiteLabel: { type: Boolean, default: false },
    customDomain: { type: String },
    logoUrl: { type: String }
  },
  
  // Status
  status: {
    type: String,
    enum: ["PENDING_PAYMENT", "ACTIVE", "SUSPENDED", "DELETED"],
    default: "PENDING_PAYMENT"
  }
  
}, { timestamps: true });

module.exports = mongoose.model("Organization", organizationSchema);