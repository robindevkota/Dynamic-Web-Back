// backend/routes/endUserAuthRoutes.js

const express = require('express');
const router = express.Router();
const endUserAuthController = require('../controllers/endUserAuthController');

// ═══════════════════════════════════════════════════════
// END USER AUTH ROUTES (For client websites)
// ═══════════════════════════════════════════════════════

router.post('/signup', endUserAuthController.signup);
router.get('/verify-email', endUserAuthController.verifyEmail);
router.post('/login', endUserAuthController.login);
router.post('/logout', endUserAuthController.logout);
router.post('/forgot-password', endUserAuthController.forgotPassword);
router.post('/reset-password', endUserAuthController.resetPassword);

module.exports = router;