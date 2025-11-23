const express = require("express");
const router = express.Router();
const apiConfigController = require("../controllers/apiConfigController");

// Get all API configurations
router.get("/", apiConfigController.getAllAPIConfigs);

// Get API configurations by keys (for resolving page references)
router.post("/resolve", apiConfigController.getAPIConfigsByKeys);

// Get single API configuration
router.get("/:key", apiConfigController.getAPIConfig);

// Create API configuration
router.post("/", apiConfigController.createAPIConfig);

// Update API configuration
router.put("/:key", apiConfigController.updateAPIConfig);

// Delete API configuration (soft delete)
router.delete("/:key", apiConfigController.deleteAPIConfig);

// Duplicate API configuration
router.post("/:key/duplicate", apiConfigController.duplicateAPIConfig);

module.exports = router;