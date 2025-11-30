// controllers/pageConfigController.js
const mongoose = require('mongoose');
const PageConfig = require('../models/PageConfig');

// GET all pages (for table)
exports.getAllPages = async (req, res) => {
  try {
    const pages = await PageConfig.find({ status: { $ne: 'Deleted' } })
      .select('title slug projectUUID taskUUID status accountValidation otpValidation isAnonymous createdAt')
      .sort({ createdAt: -1 });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single page config by slug (for renderer)
// GET single page config by slug (for renderer)
// GET single page config by slug (for renderer)
// GET single page config by slug (for renderer)
exports.getPageBySlug = async (req, res) => {
  try {
    const APIConfig = require('../models/APIConfig');
    
    const page = await PageConfig.findOne({ 
      slug: req.params.slug,
      status: { $ne: 'Deleted' } 
    });
    
    if (!page) return res.status(404).json({ message: 'Page not found' });
    
    console.log(`📤 Sending page config for: ${page.slug}`);
    
    // 🔥 FIX: Convert Mongoose Map to plain object
    const pageObject = page.toObject();
    
    // 🔥 Convert pages Map to regular object
    if (pageObject.pages && pageObject.pages instanceof Map) {
      pageObject.pages = Object.fromEntries(pageObject.pages);
    }
    
    console.log(`   - Sub-pages available:`, Object.keys(pageObject.pages || {}));
    
    // ✅ ADD THIS: Log actions for debugging
    console.log(`   - Actions available:`, pageObject.initialization?.actions ? Object.keys(pageObject.initialization.actions) : 'NO ACTIONS');
    
    // 🆕 RESOLVE API REFERENCES
    if (pageObject.initialization?.resources && Array.isArray(pageObject.initialization.resources)) {
      const firstResource = pageObject.initialization.resources[0];
      
      // If resources are strings (API keys), resolve them
      if (typeof firstResource === "string") {
        console.log(`🔍 Resolving ${pageObject.initialization.resources.length} API keys...`);
        
        const apiKeys = pageObject.initialization.resources;
        const apis = await APIConfig.find({
          key: { $in: apiKeys },
          isActive: true,
        });
        
        console.log(`✅ Found ${apis.length} API configurations`);
        
        // Convert to object map for easy lookup
        const apisMap = {};
        apis.forEach(api => {
          apisMap[api.key] = {
            key: api.key,
            url: api.url,
            method: api.method,
            headers: api.headers,
            transformPayload: api.transformPayload,
            successNotification: api.successNotification,
            errorNotification: api.errorNotification,
            closeModalOnSuccess: api.closeModalOnSuccess,
            storeResponse: api.storeResponse,
            storeKey: api.storeKey,
            onSuccess: api.onSuccess,
            onError: api.onError,
            onNetworkError: api.onNetworkError,
          };
        });
        
        // Return page with resolved APIs
        return res.json({
          ...pageObject,
          resolvedAPIs: apisMap,
        });
      }
    }
    
    // If old format (full objects) or no resources, return as-is
    res.json(pageObject);
    
  } catch (err) {
    console.error('❌ Error fetching page:', err);
    res.status(500).json({ message: err.message });
  }
};
// CREATE new page config
exports.createPage = async (req, res) => {
  try {
    // Ensure all components have required fields
    const components = req.body.components || {};
    const processedComponents = {};
    
    ['navbar', 'sidebar', 'main', 'modals', 'footer'].forEach(compName => {
      if (components[compName]) {
        processedComponents[compName] = {
          table: components[compName].table || {},
          modal: components[compName].modal || {},
          uiSchema: components[compName].uiSchema || {},
          styles: components[compName].styles || {},
          triggers: components[compName].triggers || []
        };
      }
    });
    
    // ✅ ADD THIS: Handle initialization with actions
    const initialization = req.body.initialization || {};
    const processedInitialization = {
      globalCSS: initialization.globalCSS || '',
      resources: initialization.resources || [],
      actions: initialization.actions || {} // ✅ Preserve actions
    };
    
    const pageData = {
      ...req.body,
      components: processedComponents,
      initialization: processedInitialization // ✅ Use processed initialization
    };
    
    const page = new PageConfig(pageData);
    await page.save();
    
    console.log(`✅ Created page: ${page.slug}`);
    console.log(`   - Actions:`, Object.keys(page.initialization.actions || {}));
    
    res.status(201).json(page);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug already exists' });
    }
    console.error('❌ Create error:', err);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE page config
exports.updatePage = async (req, res) => {
  try {
    // Ensure all components have required fields
    const components = req.body.components || {};
    const processedComponents = {};
    
    ['navbar', 'sidebar', 'main', 'modals', 'footer'].forEach(compName => {
      if (components[compName]) {
        processedComponents[compName] = {
          table: components[compName].table || {},
          modal: components[compName].modal || {},
          uiSchema: components[compName].uiSchema || {},
          styles: components[compName].styles || {},
          triggers: components[compName].triggers || []
        };
      }
    });

    // ✅ ADD THIS: Handle initialization with actions
    const initialization = req.body.initialization || {};
    const processedInitialization = {
      globalCSS: initialization.globalCSS || '',
      resources: initialization.resources || [],
      actions: initialization.actions || {} // ✅ Preserve actions
    };

    const updateData = {
      ...req.body,
      components: processedComponents,
      initialization: processedInitialization // ✅ Use processed initialization
    };

    const page = await PageConfig.findOneAndUpdate(
      { slug: req.params.slug },
      {
        $set: updateData,
        $inc: { version: 1 }
      },
      { new: true, runValidators: true }
    );

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    console.log(`✅ Updated page: ${page.slug} (v${page.version})`);
    console.log(`   - Actions:`, Object.keys(page.initialization.actions || {}));
    
    res.json(page);

  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(400).json({ message: err.message });
  }
};

// SOFT DELETE
exports.deletePage = async (req, res) => {
  try {
    const page = await PageConfig.findOneAndUpdate(
      { slug: req.params.slug },
      { status: 'Deleted' },
      { new: true }
    );
    if (!page) return res.status(404).json({ message: 'Page not found' });
    
    console.log(`🗑️  Deleted page: ${page.slug}`);
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};