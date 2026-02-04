const APIConfig = require("../models/APIConfig");

// Get all API configurations (with role-based filtering)
exports.getAllAPIConfigs = async (req, res) => {
  try {
    const { projectUUID, tags, search } = req.query;
    const { role, organizationId } = req.user; // ✅ Get user context
    
    let query = { isActive: true };
    
    // ✅ Role-based filtering
    if (role === 'SUPER_ADMIN') {
      // No org filter - SUPER_ADMIN sees all API configs
      console.log('🔓 SUPER_ADMIN - showing all API configs');
    } 
    else if (role === 'CLIENT_ADMIN' || role === 'DEVELOPER') {
      // ✅ Can only see: global configs + their org's configs
      console.log(`🔒 ${role} - filtering to global + org ${organizationId}`);
      
      const orgFilter = {
        $or: [
          { projectUUID: "global" },           // Global APIs
          { organizationId: organizationId }   // Their org's APIs
        ]
      };
      
      query = { ...query, ...orgFilter };
    }
    
    // Filter by specific project (if provided)
    if (projectUUID && projectUUID !== "global") {
      // Add project filter while preserving org filter
      if (role === 'CLIENT_ADMIN' || role === 'DEVELOPER') {
        // Must match BOTH: (global OR their org) AND (projectUUID OR global)
        query = {
          isActive: true,
          $and: [
            {
              $or: [
                { projectUUID: "global" },
                { organizationId: organizationId }
              ]
            },
            {
              $or: [
                { projectUUID: projectUUID },
                { projectUUID: "global" }
              ]
            }
          ]
        };
      } else {
        // SUPER_ADMIN - just filter by project
        query.$or = [
          { projectUUID: projectUUID },
          { projectUUID: "global" }
        ];
      }
    }
    
    // Filter by tags
    if (tags) {
      const tagArray = tags.split(",");
      if (query.$and) {
        query.$and.push({ tags: { $in: tagArray } });
      } else {
        query.tags = { $in: tagArray };
      }
    }
    
    // Search by key or name
    if (search) {
      const searchFilter = {
        $or: [
          { key: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ]
      };
      
      if (query.$and) {
        query.$and.push(searchFilter);
      } else if (query.$or && !projectUUID) {
        // If we have $or from org filter, wrap it
        query = {
          isActive: true,
          $and: [
            { $or: query.$or },
            searchFilter
          ]
        };
      } else {
        query = { ...query, ...searchFilter };
      }
    }
    
    console.log(`📋 API Config query:`, JSON.stringify(query, null, 2));
    
    const apis = await APIConfig.find(query).sort({ createdAt: -1 });
    
    console.log(`✅ Returning ${apis.length} API configs for ${role}`);
    
    res.json({
      success: true,
      count: apis.length,
      data: apis,
    });
  } catch (error) {
    console.error('❌ getAllAPIConfigs error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single API configuration by key (with permission check)
exports.getAPIConfig = async (req, res) => {
  try {
    const { key } = req.params;
    const { role, organizationId } = req.user;
    
    console.log(`🔍 Looking for API config: ${key} (User: ${role})`);
    
    const api = await APIConfig.findOne({ key, isActive: true });
    
    if (!api) {
      console.log(`❌ API config not found: ${key}`);
      return res.status(404).json({
        success: false,
        message: "API configuration not found",
      });
    }
    
    // ✅ Check permissions
    if (role !== 'SUPER_ADMIN') {
      // Must be global OR belong to user's org
      const isGlobal = api.projectUUID === 'global';
      const isOwnOrg = api.organizationId?.toString() === organizationId;
      
      if (!isGlobal && !isOwnOrg) {
        console.log(`🚫 Access denied: ${key} does not belong to org ${organizationId}`);
        return res.status(403).json({
          success: false,
          message: "You don't have permission to access this API configuration",
        });
      }
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
    const { role, organizationId } = req.user;
    
    if (!keys || !Array.isArray(keys)) {
      return res.status(400).json({
        success: false,
        message: "keys must be an array",
      });
    }
    
    let query = {
      key: { $in: keys },
      isActive: true,
    };
    
    // ✅ Apply org filter for non-SUPER_ADMIN
    if (role !== 'SUPER_ADMIN') {
      query.$or = [
        { projectUUID: "global" },
        { organizationId: organizationId }
      ];
    }
    
    const apis = await APIConfig.find(query);
    
    // Return as object with key as property
    const apisMap = {};
    apis.forEach(api => {
      apisMap[api.key] = api;
    });
    
    console.log(`✅ Returning ${Object.keys(apisMap).length}/${keys.length} API configs`);
    
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
    const { role, organizationId, userId } = req.user;
    
    // ✅ Auto-set organizationId from logged-in user (unless SUPER_ADMIN creating global)
    const apiData = {
      ...req.body,
      createdBy: userId,
    };
    
    // Set organizationId based on role
    if (role === 'SUPER_ADMIN') {
      // SUPER_ADMIN can create global or org-specific
      if (req.body.projectUUID === 'global') {
        apiData.organizationId = null; // Global config
      } else {
        apiData.organizationId = req.body.organizationId || organizationId;
      }
    } else {
      // CLIENT_ADMIN/DEVELOPER can only create for their org
      apiData.organizationId = organizationId;
      // Cannot create global configs
      if (req.body.projectUUID === 'global') {
        return res.status(403).json({
          success: false,
          message: "Only SUPER_ADMIN can create global API configurations",
        });
      }
    }
    
    const apiConfig = new APIConfig(apiData);
    await apiConfig.save();
    
    console.log(`✅ API config created: ${apiConfig.key} by ${role}`);
    
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
    
    console.error('❌ createAPIConfig error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update API configuration (with permission check)
exports.updateAPIConfig = async (req, res) => {
  try {
    const { key } = req.params;
    const { role, organizationId, userId } = req.user;
    
    // ✅ First check if config exists and user has permission
    const existingConfig = await APIConfig.findOne({ key });
    
    if (!existingConfig) {
      return res.status(404).json({
        success: false,
        message: "API configuration not found",
      });
    }
    
    // ✅ Permission check
    if (role !== 'SUPER_ADMIN') {
      const isGlobal = existingConfig.projectUUID === 'global';
      const isOwnOrg = existingConfig.organizationId?.toString() === organizationId;
      
      if (isGlobal) {
        return res.status(403).json({
          success: false,
          message: "Only SUPER_ADMIN can update global API configurations",
        });
      }
      
      if (!isOwnOrg) {
        return res.status(403).json({
          success: false,
          message: "You can only update API configurations from your organization",
        });
      }
    }
    
    // ✅ Prevent changing organizationId (except SUPER_ADMIN)
    if (role !== 'SUPER_ADMIN' && req.body.organizationId) {
      delete req.body.organizationId;
    }
    
    const apiConfig = await APIConfig.findOneAndUpdate(
      { key },
      { 
        ...req.body, 
        updatedAt: Date.now(),
        updatedBy: userId 
      },
      { new: true, runValidators: true }
    );
    
    console.log(`✅ API config updated: ${key} by ${role}`);
    
    res.json({
      success: true,
      message: "API configuration updated successfully",
      data: apiConfig,
    });
  } catch (error) {
    console.error('❌ updateAPIConfig error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete API configuration (soft delete with permission check)
exports.deleteAPIConfig = async (req, res) => {
  try {
    const { key } = req.params;
    const { role, organizationId } = req.user;
    
    // ✅ Check permission before deleting
    const existingConfig = await APIConfig.findOne({ key });
    
    if (!existingConfig) {
      return res.status(404).json({
        success: false,
        message: "API configuration not found",
      });
    }
    
    // ✅ Permission check
    if (role !== 'SUPER_ADMIN') {
      const isGlobal = existingConfig.projectUUID === 'global';
      const isOwnOrg = existingConfig.organizationId?.toString() === organizationId;
      
      if (isGlobal) {
        return res.status(403).json({
          success: false,
          message: "Only SUPER_ADMIN can delete global API configurations",
        });
      }
      
      if (!isOwnOrg) {
        return res.status(403).json({
          success: false,
          message: "You can only delete API configurations from your organization",
        });
      }
    }
    
    const apiConfig = await APIConfig.findOneAndUpdate(
      { key },
      { isActive: false },
      { new: true }
    );
    
    console.log(`🗑️ API config deleted: ${key} by ${role}`);
    
    res.json({
      success: true,
      message: "API configuration deleted successfully",
    });
  } catch (error) {
    console.error('❌ deleteAPIConfig error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Duplicate API configuration (with permission check)
exports.duplicateAPIConfig = async (req, res) => {
  try {
    const { key } = req.params;
    const { newKey } = req.body;
    const { role, organizationId, userId } = req.user;
    
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
    
    // ✅ Permission check
    if (role !== 'SUPER_ADMIN') {
      const isGlobal = original.projectUUID === 'global';
      const isOwnOrg = original.organizationId?.toString() === organizationId;
      
      if (!isGlobal && !isOwnOrg) {
        return res.status(403).json({
          success: false,
          message: "You can only duplicate API configurations you have access to",
        });
      }
    }
    
    const duplicate = new APIConfig({
      ...original.toObject(),
      _id: undefined,
      key: newKey,
      name: `${original.name} (Copy)`,
      createdAt: undefined,
      updatedAt: undefined,
      createdBy: userId,
      // ✅ Duplicate goes to user's org (not global)
      organizationId: role === 'SUPER_ADMIN' ? (req.body.organizationId || organizationId) : organizationId,
      projectUUID: role === 'SUPER_ADMIN' && req.body.projectUUID === 'global' ? 'global' : original.projectUUID,
    });
    
    await duplicate.save();
    
    console.log(`📋 API config duplicated: ${key} → ${newKey} by ${role}`);
    
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
    
    console.error('❌ duplicateAPIConfig error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};