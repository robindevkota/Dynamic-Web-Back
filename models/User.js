// backend/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "CLIENT_ADMIN", "DEVELOPER"],
      required: true,
    },
    
    organizationId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Organization",
      required: function() {
        return this.role !== 'SUPER_ADMIN'; // Only super admin can have no org
      }
    },
    
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    
    // ✅ ADD THESE FIELDS
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    
    // For password reset
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    
    // For developer invitations
    invitationToken: { type: String },
    invitationExpires: { type: Date },
    invitedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: function() {
        return this.role === 'DEVELOPER';
      }
    },
    
    // Account status
    status: {
      type: String,
      enum: ["PENDING_VERIFICATION", "PENDING_PAYMENT", "ACTIVE", "SUSPENDED"],
      default: "PENDING_VERIFICATION"
    },
    
    lastLogin: { type: Date },
    
    // Developer-specific
    assignedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);