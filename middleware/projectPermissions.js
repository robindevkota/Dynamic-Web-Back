// backend/middleware/projectPermissions.js

const Organization = require("../models/Organization");
const PageConfig = require("../models/PageConfig");

// ✅ Check if user can create new project
exports.canCreateProject = async (req, res, next) => {
  try {
    console.log('🔍 canCreateProject - checking permissions...');
    console.log('   User:', req.user);

    // ⚠️ CRITICAL: Check if req.user exists
    if (!req.user) {
      console.error('❌ req.user is undefined in canCreateProject');
      return res.status(401).json({ 
        error: "Authentication required",
        hint: "Auth middleware may not be running before permission check"
      });
    }

    const { role, organizationId, userId } = req.user;
    console.log(`   Role: ${role}, OrgId: ${organizationId}`);

    // SUPER_ADMIN can always create
    if (role === 'SUPER_ADMIN') {
      console.log('✅ SUPER_ADMIN - permission granted');
      return next();
    }

    // CLIENT_ADMIN: Check project limits
    if (role === 'CLIENT_ADMIN') {
      if (!organizationId) {
        return res.status(400).json({ error: "No organization found" });
      }

      const organization = await Organization.findById(organizationId);
      
      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }

      console.log(`   Current projects: ${organization.currentProjects}/${organization.maxProjects}`);

      // Check if limit reached
      if (organization.currentProjects >= organization.maxProjects) {
        console.log('❌ Project limit reached');
        return res.status(403).json({ 
          error: `Project limit reached (${organization.maxProjects}). Please upgrade your plan.`,
          currentProjects: organization.currentProjects,
          maxProjects: organization.maxProjects
        });
      }

      console.log('✅ CLIENT_ADMIN - permission granted');
      return next();
    }

    // DEVELOPER cannot create projects
    console.log('❌ DEVELOPER cannot create projects');
    return res.status(403).json({ 
      error: "Only admins can create projects" 
    });

  } catch (err) {
    console.error("❌ Permission check error:", err);
    res.status(500).json({ error: "Permission check failed" });
  }
};

// ✅ Check if user can edit project
exports.canEditProject = async (req, res, next) => {
  try {
    console.log('🔍 canEditProject - checking permissions...');

    // ⚠️ CRITICAL: Check if req.user exists
    if (!req.user) {
      console.error('❌ req.user is undefined in canEditProject');
      return res.status(401).json({ 
        error: "Authentication required",
        hint: "Auth middleware may not be running before permission check"
      });
    }

    const { role, organizationId } = req.user;
    const { slug } = req.params;

    console.log(`   Role: ${role}, Slug: ${slug}`);

    const project = await PageConfig.findOne({ slug, status: { $ne: 'Deleted' } });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    console.log(`   Project org: ${project.organizationId}, Is template: ${project.isTemplate}`);

    // SUPER_ADMIN can edit everything
    if (role === 'SUPER_ADMIN') {
      console.log('✅ SUPER_ADMIN - permission granted');
      return next();
    }

    // Cannot edit templates
    if (project.isTemplate) {
      console.log('❌ Cannot edit template');
      return res.status(403).json({ 
        error: "Starter templates are read-only. Clone this template to customize it.",
        isTemplate: true
      });
    }

    // CLIENT_ADMIN can only edit their own org's projects
    if (role === 'CLIENT_ADMIN') {
      if (!project.organizationId || project.organizationId.toString() !== organizationId) {
        console.log('❌ Not your organization');
        return res.status(403).json({ 
          error: "You can only edit projects from your organization" 
        });
      }
      console.log('✅ CLIENT_ADMIN - permission granted');
      return next();
    }

    // DEVELOPER cannot edit
    console.log('❌ DEVELOPER cannot edit');
    return res.status(403).json({ 
      error: "Developers cannot edit projects" 
    });

  } catch (err) {
    console.error("❌ Permission check error:", err);
    res.status(500).json({ error: "Permission check failed" });
  }
};

// ✅ Check if user can delete project
exports.canDeleteProject = async (req, res, next) => {
  try {
    console.log('🔒 canDeleteProject - checking permissions...');

    if (!req.user) {
      console.error('❌ req.user is undefined in canDeleteProject');
      return res.status(401).json({ 
        error: "Authentication required",
      });
    }

    const { role, organizationId } = req.user;
    const { slug } = req.params;

    const project = await PageConfig.findOne({ slug, status: { $ne: 'Deleted' } });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // ✅ Cannot delete templates
    if (project.isTemplate) {
      console.log('❌ Cannot delete template');
      return res.status(403).json({ 
        error: "Starter templates cannot be deleted" 
      });
    }

    // SUPER_ADMIN can delete anything (except templates)
    if (role === 'SUPER_ADMIN') {
      console.log('✅ SUPER_ADMIN - permission granted');
      return next();
    }

    // ✅ CLIENT_ADMIN can delete their own org's projects
    if (role === 'CLIENT_ADMIN') {
      if (!project.organizationId || project.organizationId.toString() !== organizationId) {
        console.log('❌ Not your organization');
        return res.status(403).json({ 
          error: "You can only delete projects from your organization" 
        });
      }
      console.log('✅ CLIENT_ADMIN - permission granted');
      return next();
    }

    // ✅ DEVELOPER can delete their own org's projects
    if (role === 'DEVELOPER') {
      if (!project.organizationId || project.organizationId.toString() !== organizationId) {
        console.log('❌ Not your organization');
        return res.status(403).json({ 
          error: "You can only delete projects from your organization" 
        });
      }
      console.log('✅ DEVELOPER - permission granted');
      return next();
    }

    // Unknown role
    console.log('❌ Unknown role:', role);
    return res.status(403).json({ 
      error: "Invalid role" 
    });

  } catch (err) {
    console.error("❌ Permission check error:", err);
    res.status(500).json({ error: "Permission check failed" });
  }
};