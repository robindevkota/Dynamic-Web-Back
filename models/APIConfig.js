const mongoose = require("mongoose");

const APIConfigSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    
    // API Configuration
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      default: "GET",
    },
    headers: {
      type: Object,
      default: {},
    },
    
    // Payload Transformation
    transformPayload: {
      type: String, // Function as string: "(payload) => ({ ... })"
      default: "",
    },
    
    // Notifications
    successNotification: {
      type: {
        type: String,
        enum: ["toast", "alert", "none"],
        default: "toast",
      },
      message: String,
      background: String,
      duration: Number,
    },
    errorNotification: {
      type: {
        type: String,
        enum: ["toast", "alert", "none"],
        default: "toast",
      },
      message: String,
      background: String,
      duration: Number,
    },
    
    // Post-Action Behaviors
    closeModalOnSuccess: {
      type: Boolean,
      default: false,
    },
    storeResponse: {
      type: Boolean,
      default: false,
    },
    storeKey: {
      type: String,
      default: "",
    },
    
    // Actions
    onSuccess: {
      type: [String], // Array of actions: ["navigate:/dashboard", "openModal:welcome"]
      default: [],
    },
    onError: {
      type: [String],
      default: [],
    },
    onNetworkError: {
      type: String,
      default: "",
    },
    
    // Metadata
    tags: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    projectUUID: {
      type: String,
      default: "global", // "global" means available to all projects
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Index for faster queries
APIConfigSchema.index({ key: 1, projectUUID: 1 });
APIConfigSchema.index({ tags: 1 });

module.exports = mongoose.model("APIConfig", APIConfigSchema);