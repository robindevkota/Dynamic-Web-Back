// models/APIConfig.js - COMPLETE VERSION

const mongoose = require("mongoose");

const APIConfigSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      default: "GET",
    },
    headers: {
      type: Map,
      of: String,
      default: {},
    },
    transformPayload: String,
    
    successNotification: {
      type: {
        type: String,
        enum: ["toast", "modal", "banner", "none"],
      },
      message: String,
      background: String,
      duration: Number,
    },
    
    errorNotification: {
      type: {
        type: String,
        enum: ["toast", "modal", "banner", "none"],
      },
      message: String,
      background: String,
      duration: Number,
    },
    
    closeModalOnSuccess: {
      type: Boolean,
      default: false,
    },
    
    storeResponse: {
      type: Boolean,
      default: false,
    },
    
    storeKey: String,
    
    // ✅ Support both string and object formats
    onSuccess: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    
    onError: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    
    onNetworkError: mongoose.Schema.Types.Mixed,
    
    tags: [String],
    
    projectUUID: {
      type: String,
      default: "global",
    },
    
    // ✅ ADD THIS: isActive field
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("APIConfig", APIConfigSchema);