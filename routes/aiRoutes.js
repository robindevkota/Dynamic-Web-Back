const express = require('express');
const router = express.Router();
const aiGeneratorController = require('../controllers/aiGeneratorController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route   POST /api/ai/generate
 * @desc    Generate a PageConfig JSON using AI
 * @access  Private (Authenticated Users)
 */
router.post('/generate', authMiddleware, aiGeneratorController.generatePage);

module.exports = router;
