// controllers/pageConfigController.js - FIXED TRIGGERS
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
      .select('title slug projectUUID taskUUID status projectStatus projectDeactivationReason isTemplate templateCategory organizationId createdAt accountValidation otpValidation isAnonymous')
      .populate('organizationId', 'name')
      .sort({ isTemplate: -1, createdAt: -1 }); // Templates first

    // ✅ Add permission flags to each page
    const pagesWithPermissions = pages.map(page => ({
      ...page.toObject(),
      canEdit: role === 'SUPER_ADMIN' || 
               (!page.isTemplate && page.organizationId?._id.toString() === organizationId),
      canDelete: role === 'SUPER_ADMIN' || 
                 (!page.isTemplate && page.organizationId?._id.toString() === organizationId),
      // ✅ NEW: Can toggle project status
      canToggleStatus: role === 'SUPER_ADMIN' || 
                       (role === 'CLIENT_ADMIN' && !page.isTemplate && page.organizationId?._id.toString() === organizationId)
    }));

    console.log(`✅ Loaded ${pagesWithPermissions.length} pages for ${role}`);
    res.json(pagesWithPermissions);

  } catch (err) {
    console.error('❌ Error fetching pages:', err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET single page config by slug (for renderer) - FIXED TRIGGERS
exports.getPageBySlug = async (req, res) => {
  try {
    const APIConfig = require('../models/APIConfig');
    
    const { role, organizationId } = req.user || {};
    
    const page = await PageConfig.findOne({ 
      slug: req.params.slug,
      status: { $ne: 'Deleted' } 
    }).populate('organizationId', 'name status');
    
    if (!page) return res.status(404).json({ message: 'Page not found' });

    // ✅ CHECK ORGANIZATION STATUS
    if (page.organizationId && page.organizationId.status !== 'ACTIVE') {
      return res.status(503).json({
        error: 'SERVICE_UNAVAILABLE',
        message: 'This service is temporarily unavailable. Please contact support.',
        organizationStatus: page.organizationId.status
      });
    }

    // ✅ CHECK PROJECT STATUS
    if (page.projectStatus !== 'ACTIVE') {
      if (!req.user || (role !== 'SUPER_ADMIN' && role !== 'CLIENT_ADMIN')) {
        if (page.projectStatus === 'MAINTENANCE' && page.maintenanceMessage) {
          return res.status(503).json({
            error: 'MAINTENANCE',
            message: page.maintenanceMessage
          });
        }
        
        return res.status(503).json({
          error: 'PROJECT_INACTIVE',
          message: 'This project is currently inactive.',
          projectStatus: page.projectStatus
        });
      }
    }

    const canEdit = req.user && (
      role === 'SUPER_ADMIN' || 
      (!page.isTemplate && page.organizationId?._id.toString() === organizationId)
    );
    
    console.log(`📤 Sending page config for: ${page.slug}`);
    console.log(`   Authenticated: ${!!req.user}`);
    console.log(`   Can edit: ${canEdit}`);
    console.log(`   Project Status: ${page.projectStatus}`);
    
    // Convert Mongoose Map to plain object
    const pageObject = page.toObject();
    
    // Convert pages Map to regular object
    if (pageObject.pages && pageObject.pages instanceof Map) {
      pageObject.pages = Object.fromEntries(pageObject.pages);
    }
    
    console.log(`   - Sub-pages available:`, Object.keys(pageObject.pages || {}));
    console.log(`   - Actions available:`, pageObject.initialization?.actions ? Object.keys(pageObject.initialization.actions) : 'NO ACTIONS');
    
    // ✅ CRITICAL FIX: Log triggers BEFORE resolving
    console.log(`   - Main triggers:`, pageObject.components?.main?.triggers || 'NO TRIGGERS');
    
    // ✅ RESOLVE COMPONENT REFERENCES (preserves triggers)
    const resolvedPageObject = resolveComponentReferences(pageObject);
    
    // ✅ CRITICAL FIX: Log triggers AFTER resolving
    console.log(`   - Main triggers (after resolve):`, resolvedPageObject.components?.main?.triggers || 'NO TRIGGERS');
    
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
        
        // ✅ CRITICAL FIX: PRESERVE TRIGGERS when returning
        const response = {
          ...resolvedPageObject,
          resolvedAPIs: apisMap,
          canEdit: canEdit || false,
          canDelete: canEdit && !page.isTemplate || false,
          projectStatus: page.projectStatus
        };
        
        // ✅ VERIFY triggers are still in response
        console.log(`📦 Triggers in response:`, response.components?.main?.triggers || 'NO TRIGGERS IN RESPONSE');
        
        return res.json(response);
      }
    }
    
    // If old format (full objects) or no resources, return as-is
    const response = {
      ...resolvedPageObject,
      canEdit: canEdit || false,
      canDelete: canEdit && !page.isTemplate || false,
      projectStatus: page.projectStatus
    };
    
    // ✅ VERIFY triggers are still in response
    console.log(`📦 Triggers in response (no resolve):`, response.components?.main?.triggers || 'NO TRIGGERS IN RESPONSE');
    
    res.json(response);
    
  } catch (err) {
    console.error('❌ Error fetching page:', err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ CREATE new page config
exports.createPage = async (req, res) => {
  try {
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
          triggers: components[compName].triggers || [] // ✅ PRESERVE TRIGGERS
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
    
    // ✅ Process pages (preserve references AND triggers)
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
              triggers: comp.triggers || [] // ✅ PRESERVE TRIGGERS
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
    console.log(`   - Main triggers:`, page.components?.main?.triggers || 'NO TRIGGERS');
    
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
          triggers: components[compName].triggers || [] // ✅ PRESERVE TRIGGERS
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

    // ✅ Process pages (preserve references AND triggers)
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
              triggers: comp.triggers || [] // ✅ PRESERVE TRIGGERS
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
    console.log(`   - Main triggers:`, page.components?.main?.triggers || 'NO TRIGGERS');
    
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
    
    console.log(`🗑️ Deleted page: ${page.slug}`);
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Toggle Project Status
exports.toggleProjectStatus = async (req, res) => {
  try {
    const { slug } = req.params;
    const { status, reason, maintenanceMessage } = req.body;
    const { role, organizationId, userId } = req.user;
    
    console.log(`🔄 Toggle project status request:`, { slug, status, role });
    
    // Validate status
    if (!['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'ARCHIVED'].includes(status)) {
      return res.status(400).json({ 
        error: "Invalid status. Must be ACTIVE, INACTIVE, MAINTENANCE, or ARCHIVED" 
      });
    }
    
    // Find the project
    const PageConfig = require('../models/PageConfig');
    const project = await PageConfig.findOne({ 
      slug, 
      status: { $ne: 'Deleted' } 
    });
    
    if (!project) {
      console.log(`❌ Project not found: ${slug}`);
      return res.status(404).json({ error: "Project not found" });
    }
    
    // ✅ Permission check
    if (role === 'SUPER_ADMIN') {
      console.log('✅ SUPER_ADMIN - permission granted');
    } else if (role === 'CLIENT_ADMIN') {
      if (!project.organizationId || project.organizationId.toString() !== organizationId) {
        console.log(`❌ Permission denied: Project not in user's organization`);
        return res.status(403).json({ 
          error: "You can only manage projects from your organization" 
        });
      }
      
      if (project.isTemplate) {
        console.log(`❌ Permission denied: Cannot modify template`);
        return res.status(403).json({ 
          error: "Cannot modify starter templates" 
        });
      }
      
      console.log('✅ CLIENT_ADMIN - permission granted');
    } else {
      console.log(`❌ Permission denied: Role ${role} cannot toggle status`);
      return res.status(403).json({ 
        error: "Only administrators can manage project status" 
      });
    }
    
    // Store previous status
    const previousStatus = project.projectStatus || 'ACTIVE';
    
    // Update project status
    project.projectStatus = status;
    project.projectDeactivatedAt = (status !== 'ACTIVE') ? new Date() : null;
    project.projectDeactivatedBy = (status !== 'ACTIVE') ? userId : null;
    
    // Set reason if provided
    if (reason && status !== 'ACTIVE') {
      project.projectDeactivationReason = reason;
    } else if (status === 'ACTIVE') {
      project.projectDeactivationReason = null;
      project.maintenanceMessage = null;
    }
    
    // Set maintenance message if provided
    if (maintenanceMessage && status === 'MAINTENANCE') {
      project.maintenanceMessage = maintenanceMessage;
    }
    
    await project.save();
    
    console.log(`✅ Project status updated: ${project.slug}`);
    console.log(`   ${previousStatus} → ${status}`);
    
    res.json({
      success: true,
      message: `Project ${status === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`,
      project: {
        id: project._id,
        slug: project.slug,
        title: project.title,
        projectStatus: project.projectStatus,
        previousStatus: previousStatus
      }
    });
    
  } catch (err) {
    console.error("❌ Error toggling project status:", err);
    res.status(500).json({ 
      error: "Failed to update project status",
      details: err.message 
    });
  }
};

// ✅ Clone Template
exports.cloneTemplate = async (req, res) => {
  try {
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

    // Check project limits
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