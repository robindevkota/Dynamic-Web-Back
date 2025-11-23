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
exports.getPageBySlug = async (req, res) => {
  try {
    const page = await PageConfig.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    
    // Log what we're sending
    console.log(`📤 Sending page config for: ${page.slug}`);
    console.log(`   - Has navbar: ${!!page.components?.navbar}`);
    console.log(`   - Has sidebar: ${!!page.components?.sidebar}`);
    console.log(`   - Has main: ${!!page.components?.main}`);
    console.log(`   - Has modals: ${!!page.components?.modals}`);
    console.log(`   - Has footer: ${!!page.components?.footer}`);
    
    res.json(page);
  } catch (err) {
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
    
    const pageData = {
      ...req.body,
      components: processedComponents
    };
    
    const page = new PageConfig(pageData);
    await page.save();
    
    console.log(`✅ Created page: ${page.slug}`);
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

    const updateData = {
      ...req.body,
      components: processedComponents
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