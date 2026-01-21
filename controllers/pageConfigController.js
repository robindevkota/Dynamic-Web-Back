// controllers/pageConfigController.js
const mongoose = require('mongoose');
const PageConfig = require('../models/PageConfig');
const Organization = require('../models/Organization');

// ✅ Helper function to resolve component references
function resolveComponentReferences(pageObject) {
  console.log('🔄 Resolving component references...');
  
  const mainComponents = pageObject.components || {};
  
  // Build reference map from main components
  const componentMap = {};
  Object.entries(mainComponents).forEach(([key, component]) => {
    if (component && component._id) {
      componentMap[component._id] = component;
      console.log(`   📌 Registered: ${component._id}`);
    }
  });
  
  // Resolve references in pages
  if (pageObject.pages) {
    Object.keys(pageObject.pages).forEach(pageName => {
      const page = pageObject.pages[pageName];
      
      if (page.components) {
        ['navbar', 'sidebar', 'main', 'modals', 'footer'].forEach(compType => {
          const component = page.components[compType];
          
          // Check if it's a reference
          if (component && component.$ref) {
            const refId = component.$ref;
            
            if (componentMap[refId]) {
              // Clone the referenced component (deep copy)
              page.components[compType] = JSON.parse(
                JSON.stringify(componentMap[refId])
              );
              // Remove the _id from resolved component to avoid confusion
              delete page.components[compType]._id;
              
              console.log(`   ✅ Resolved ${compType} → ${refId} for page "${pageName}"`);
            } else {
              console.warn(`   ⚠️ Reference not found: ${refId} for ${compType} in page "${pageName}"`);
              // Keep the original reference object (don't break the page)
            }
          }
        });
      }
    });
  }
  
  return pageObject;
}

// ✅ GET all pages (filtered by role and permissions)
exports.getAllPages = async (req, res) => {
  try {
    // ✅ Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { role, organizationId } = req.user;

    let query = { status: { $ne: 'Deleted' } };

    // SUPER_ADMIN sees everything
    if (role === 'SUPER_ADMIN') {
      // No filter needed - sees all
    }
    // CLIENT_ADMIN sees: templates + their org's projects
    else if (role === 'CLIENT_ADMIN') {
      query = {
        ...query,
        $or: [
          { isTemplate: true },                    // ✅ All global templates
          { organizationId: organizationId }       // ✅ Their projects
        ]
      };
    }
    // DEVELOPER sees: templates + their org's projects (read-only)
    else if (role === 'DEVELOPER') {
      query = {
        ...query,
        $or: [
          { isTemplate: true },                    // ✅ All global templates
          { organizationId: organizationId }       // ✅ Their org's projects
        ]
      };
    }

    const pages = await PageConfig.find(query)
      .select('title slug projectUUID taskUUID status isTemplate templateCategory organizationId createdAt accountValidation otpValidation isAnonymous')
      .populate('organizationId', 'name')
      .sort({ isTemplate: -1, createdAt: -1 }); // Templates first

    // ✅ Add permission flags to each page
    const pagesWithPermissions = pages.map(page => ({
      ...page.toObject(),
      // ✅ Can edit: SUPER_ADMIN can edit all, CLIENT_ADMIN/DEVELOPER can edit their own (non-template)
      canEdit: role === 'SUPER_ADMIN' || 
               (!page.isTemplate && page.organizationId?._id.toString() === organizationId),
      
      // ✅ Can delete: SUPER_ADMIN can delete all, CLIENT_ADMIN/DEVELOPER can delete their own (non-template)
      canDelete: role === 'SUPER_ADMIN' || 
                 (!page.isTemplate && page.organizationId?._id.toString() === organizationId)
    }));

    console.log(`✅ Loaded ${pagesWithPermissions.length} pages for ${role}`);
    res.json(pagesWithPermissions);

  } catch (err) {
    console.error('❌ Error fetching pages:', err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET single page config by slug (for renderer)
// PUBLIC route - no auth required for rendering pages
exports.getPageBySlug = async (req, res) => {
  try {
    const APIConfig = require('../models/APIConfig');
    
    // ✅ req.user is optional for this route (public pages like /auth don't need auth)
    const { role, organizationId } = req.user || {};
    
    const page = await PageConfig.findOne({ 
      slug: req.params.slug,
      status: { $ne: 'Deleted' } 
    }).populate('organizationId', 'name');
    
    if (!page) return res.status(404).json({ message: 'Page not found' });

    // Check permissions (only if user is authenticated)
    const canEdit = req.user && (
      role === 'SUPER_ADMIN' || 
      (!page.isTemplate && page.organizationId?._id.toString() === organizationId)
    );
    
    console.log(`📤 Sending page config for: ${page.slug}`);
    console.log(`   Authenticated: ${!!req.user}`);
    console.log(`   Can edit: ${canEdit}`);
    
    // Convert Mongoose Map to plain object
    const pageObject = page.toObject();
    
    // Convert pages Map to regular object
    if (pageObject.pages && pageObject.pages instanceof Map) {
      pageObject.pages = Object.fromEntries(pageObject.pages);
    }
    
    console.log(`   - Sub-pages available:`, Object.keys(pageObject.pages || {}));
    console.log(`   - Actions available:`, pageObject.initialization?.actions ? Object.keys(pageObject.initialization.actions) : 'NO ACTIONS');
    
    // ✅ RESOLVE COMPONENT REFERENCES
    const resolvedPageObject = resolveComponentReferences(pageObject);
    
    // RESOLVE API REFERENCES
    if (resolvedPageObject.initialization?.resources && Array.isArray(resolvedPageObject.initialization.resources)) {
      const firstResource = resolvedPageObject.initialization.resources[0];
      
      // If resources are strings (API keys), resolve them
      if (typeof firstResource === "string") {
        console.log(`🔍 Resolving ${resolvedPageObject.initialization.resources.length} API keys...`);
        
        const apiKeys = resolvedPageObject.initialization.resources;
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
        
        // Return page with resolved APIs and resolved component references
        return res.json({
          ...resolvedPageObject,
          resolvedAPIs: apisMap,
          canEdit: canEdit || false,
          canDelete: canEdit && !page.isTemplate || false
        });
      }
    }
    
    // If old format (full objects) or no resources, return as-is
    res.json({
      ...resolvedPageObject,
      canEdit: canEdit || false,
      canDelete: canEdit && !page.isTemplate || false
    });
    
  } catch (err) {
    console.error('❌ Error fetching page:', err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ CREATE new page config
exports.createPage = async (req, res) => {
  try {
    // ✅ Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { role, organizationId, userId } = req.user;

    // Ensure all components have required fields
    const components = req.body.components || {};
    const processedComponents = {};
    
    ['navbar', 'sidebar', 'main', 'modals', 'footer'].forEach(compName => {
      if (components[compName]) {
        processedComponents[compName] = {
          _id: components[compName]._id || undefined,
          $ref: components[compName].$ref || undefined,
          table: components[compName].table || {},
          modal: components[compName].modal || {},
          uiSchema: components[compName].uiSchema || {},
          styles: components[compName].styles || {},
          triggers: components[compName].triggers || []
        };
      }
    });
    
    // Handle initialization with actions
    const initialization = req.body.initialization || {};
    const processedInitialization = {
      globalCSS: initialization.globalCSS || '',
      resources: initialization.resources || [],
      actions: initialization.actions || {}
    };
    
    // ✅ Process pages (preserve references)
    const pages = req.body.pages || {};
    const processedPages = {};
    
    Object.entries(pages).forEach(([pageName, pageData]) => {
      processedPages[pageName] = {
        title: pageData.title,
        components: {}
      };
      
      ['navbar', 'sidebar', 'main', 'modals', 'footer'].forEach(compName => {
        if (pageData.components && pageData.components[compName]) {
          const comp = pageData.components[compName];
          
          if (comp.$ref) {
            processedPages[pageName].components[compName] = {
              $ref: comp.$ref
            };
          } else {
            processedPages[pageName].components[compName] = {
              table: comp.table || {},
              modal: comp.modal || {},
              uiSchema: comp.uiSchema || {},
              styles: comp.styles || {},
              triggers: comp.triggers || []
            };
          }
        }
      });
    });

    // ✅ Set ownership and permissions
    const pageData = {
      ...req.body,
      components: processedComponents,
      initialization: processedInitialization,
      pages: processedPages,
      createdBy: userId,
      organizationId: role === 'SUPER_ADMIN' ? (req.body.organizationId || null) : organizationId,
      isTemplate: role === 'SUPER_ADMIN' ? (req.body.isTemplate || false) : false
    };
    
    const page = new PageConfig(pageData);
    await page.save();

    // ✅ Increment project count (if not template)
    if (!page.isTemplate && page.organizationId) {
      await Organization.findByIdAndUpdate(
        page.organizationId,
        { $inc: { currentProjects: 1 } }
      );
      console.log(`📊 Incremented project count for org: ${page.organizationId}`);
    }
    
    console.log(`✅ Created page: ${page.slug}`);
    console.log(`   - Owner: ${role} (${userId})`);
    console.log(`   - Organization: ${page.organizationId || 'Global'}`);
    console.log(`   - Is Template: ${page.isTemplate}`);
    console.log(`   - Actions:`, Object.keys(page.initialization.actions || {}));
    console.log(`   - Sub-pages:`, Object.keys(page.pages || {}));
    
    res.status(201).json(page);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug already exists' });
    }
    console.error('❌ Create error:', err);
    res.status(400).json({ message: err.message });
  }
};

// ✅ UPDATE page config
exports.updatePage = async (req, res) => {
  try {
    // ✅ Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { role } = req.user;

    // Ensure all components have required fields
    const components = req.body.components || {};
    const processedComponents = {};
    
    ['navbar', 'sidebar', 'main', 'modals', 'footer'].forEach(compName => {
      if (components[compName]) {
        processedComponents[compName] = {
          _id: components[compName]._id || undefined,
          $ref: components[compName].$ref || undefined,
          table: components[compName].table || {},
          modal: components[compName].modal || {},
          uiSchema: components[compName].uiSchema || {},
          styles: components[compName].styles || {},
          triggers: components[compName].triggers || []
        };
      }
    });

    // Handle initialization with actions
    const initialization = req.body.initialization || {};
    const processedInitialization = {
      globalCSS: initialization.globalCSS || '',
      resources: initialization.resources || [],
      actions: initialization.actions || {}
    };

    // ✅ Process pages (preserve references)
    const pages = req.body.pages || {};
    const processedPages = {};
    
    Object.entries(pages).forEach(([pageName, pageData]) => {
      processedPages[pageName] = {
        title: pageData.title,
        components: {}
      };
      
      ['navbar', 'sidebar', 'main', 'modals', 'footer'].forEach(compName => {
        if (pageData.components && pageData.components[compName]) {
          const comp = pageData.components[compName];
          
          if (comp.$ref) {
            processedPages[pageName].components[compName] = {
              $ref: comp.$ref
            };
          } else {
            processedPages[pageName].components[compName] = {
              table: comp.table || {},
              modal: comp.modal || {},
              uiSchema: comp.uiSchema || {},
              styles: comp.styles || {},
              triggers: comp.triggers || []
            };
          }
        }
      });
    });

    const updateData = {
      ...req.body,
      components: processedComponents,
      initialization: processedInitialization,
      pages: processedPages
    };

    // ✅ SUPER_ADMIN can update template status, others cannot
    if (role !== 'SUPER_ADMIN') {
      delete updateData.isTemplate;
      delete updateData.organizationId;
      delete updateData.createdBy;
    }

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
    console.log(`   - Sub-pages:`, Object.keys(page.pages || {}));
    
    res.json(page);

  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(400).json({ message: err.message });
  }
};

// ✅ SOFT DELETE
exports.deletePage = async (req, res) => {
  try {
    const page = await PageConfig.findOneAndUpdate(
      { slug: req.params.slug },
      { status: 'Deleted' },
      { new: true }
    );
    
    if (!page) return res.status(404).json({ message: 'Page not found' });

    // ✅ Decrement project count (if not template)
    if (!page.isTemplate && page.organizationId) {
      await Organization.findByIdAndUpdate(
        page.organizationId,
        { $inc: { currentProjects: -1 } }
      );
      console.log(`📊 Decremented project count for org: ${page.organizationId}`);
    }
    
    console.log(`🗑️  Deleted page: ${page.slug}`);
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ NEW: Clone template to create new project
exports.cloneTemplate = async (req, res) => {
  try {
    // ✅ Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { slug } = req.params;
    const { newTitle, newSlug } = req.body;
    const { role, organizationId, userId } = req.user;

    if (!newTitle || !newSlug) {
      return res.status(400).json({ error: "New title and slug are required" });
    }

    // Find template
    const template = await PageConfig.findOne({ 
      slug, 
      isTemplate: true,
      status: { $ne: 'Deleted' }
    });
    
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    // Check if slug already exists
    const existingPage = await PageConfig.findOne({ slug: newSlug });
    if (existingPage) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    // Check project limits (already done in middleware, but double-check)
    if (role === 'CLIENT_ADMIN') {
      const organization = await Organization.findById(organizationId);
      
      if (organization.currentProjects >= organization.maxProjects) {
        return res.status(403).json({ 
          error: `Project limit reached (${organization.maxProjects})` 
        });
      }
    }

    // Clone template
    const clonedData = template.toObject();
    delete clonedData._id;
    delete clonedData.createdAt;
    delete clonedData.updatedAt;
    delete clonedData.__v;
    
    const newPage = new PageConfig({
      ...clonedData,
      title: newTitle,
      slug: newSlug,
      isTemplate: false,
      organizationId: role === 'SUPER_ADMIN' ? (req.body.organizationId || null) : organizationId,
      createdBy: userId,
      status: 'Draft',
      version: 1
    });

    await newPage.save();

    // Increment project count
    if (newPage.organizationId) {
      await Organization.findByIdAndUpdate(
        newPage.organizationId,
        { $inc: { currentProjects: 1 } }
      );
      console.log(`📊 Incremented project count for org: ${newPage.organizationId}`);
    }

    console.log(`✅ Cloned template: ${template.slug} → ${newPage.slug}`);
    console.log(`   - New owner: ${role} (${userId})`);
    console.log(`   - Organization: ${newPage.organizationId}`);
    
    res.status(201).json(newPage);

  } catch (err) {
    console.error('❌ Clone error:', err);
    res.status(400).json({ message: err.message });
  }
};