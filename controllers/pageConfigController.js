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
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new page config
exports.createPage = async (req, res) => {
  try {
    const page = new PageConfig(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug already exists' });
    }
    res.status(400).json({ message: err.message });
  }
};

// UPDATE page config
exports.updatePage = async (req, res) => {
  try {
    const updateData = { ...req.body };

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

    res.json(page);

  } catch (err) {
    console.error("Update Error:", err);
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
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};