const APIConfig = require("../models/APIConfig");

// Get all API configurations
exports.getAllAPIConfigs = async (req, res) => {
  try {
    const { projectUUID, tags, search } = req.query;
    
    let query = { isActive: true };
    
    // Filter by project (include global APIs)
    if (projectUUID) {
      query.$or = [
        { projectUUID: projectUUID },
        { projectUUID: "global" }
      ];
    }
    
    // Filter by tags
    if (tags) {
      query.tags = { $in: tags.split(",") };
    }
    
    // Search by key or name
    if (search) {
      query.$or = [
        { key: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }
    
    const apis = await APIConfig.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: apis.length,
      data: apis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single API configuration by key
// Get single API configuration by key
exports.getAPIConfig = async (req, res) => {
  try {
    const { key } = req.params;
    
    console.log(`🔍 Looking for API config: ${key}`);
    
    const api = await APIConfig.findOne({ key, isActive: true });
    
    if (!api) {
      console.log(`❌ API config not found: ${key}`);
      return res.status(404).json({
        success: false,
        message: "API configuration not found",
      });
    }
    
    console.log(`✅ Found API config: ${api.name}`);
    
    res.json({
      success: true,
      data: api,
    });
  } catch (error) {
    console.error(`⚠️ Error fetching API config:`, error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get multiple API configurations by keys (for page resolution)
exports.getAPIConfigsByKeys = async (req, res) => {
  try {
    const { keys } = req.body; // Array of keys
    
    if (!keys || !Array.isArray(keys)) {
      return res.status(400).json({
        success: false,
        message: "keys must be an array",
      });
    }
    
    const apis = await APIConfig.find({
      key: { $in: keys },
      isActive: true,
    });
    
    // Return as object with key as property
    const apisMap = {};
    apis.forEach(api => {
      apisMap[api.key] = api;
    });
    
    res.json({
      success: true,
      data: apisMap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new API configuration
exports.createAPIConfig = async (req, res) => {
  try {
    const apiConfig = new APIConfig(req.body);
    await apiConfig.save();
    
    res.status(201).json({
      success: true,
      message: "API configuration created successfully",
      data: apiConfig,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "API key already exists",
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update API configuration
exports.updateAPIConfig = async (req, res) => {
  try {
    const { key } = req.params;
    
    const apiConfig = await APIConfig.findOneAndUpdate(
      { key },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!apiConfig) {
      return res.status(404).json({
        success: false,
        message: "API configuration not found",
      });
    }
    
    res.json({
      success: true,
      message: "API configuration updated successfully",
      data: apiConfig,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete API configuration (soft delete)
exports.deleteAPIConfig = async (req, res) => {
  try {
    const { key } = req.params;
    
    const apiConfig = await APIConfig.findOneAndUpdate(
      { key },
      { isActive: false },
      { new: true }
    );
    
    if (!apiConfig) {
      return res.status(404).json({
        success: false,
        message: "API configuration not found",
      });
    }
    
    res.json({
      success: true,
      message: "API configuration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Duplicate API configuration
exports.duplicateAPIConfig = async (req, res) => {
  try {
    const { key } = req.params;
    const { newKey } = req.body;
    
    if (!newKey) {
      return res.status(400).json({
        success: false,
        message: "newKey is required",
      });
    }
    
    const original = await APIConfig.findOne({ key });
    
    if (!original) {
      return res.status(404).json({
        success: false,
        message: "Original API configuration not found",
      });
    }
    
    const duplicate = new APIConfig({
      ...original.toObject(),
      _id: undefined,
      key: newKey,
      name: `${original.name} (Copy)`,
      createdAt: undefined,
      updatedAt: undefined,
    });
    
    await duplicate.save();
    
    res.status(201).json({
      success: true,
      message: "API configuration duplicated successfully",
      data: duplicate,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "New API key already exists",
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};