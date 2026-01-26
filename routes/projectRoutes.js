// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const PageConfig = require('../models/PageConfig');

// ✅ Get all projects for current organization
router.get('/organization/:orgId', authMiddleware, async (req, res) => {
    try {
        const { orgId } = req.params;
        const { organizationId, role } = req.user;

        // Security: Ensure user can only access their own org's projects
        if (organizationId.toString() !== orgId && role !== 'SUPER_ADMIN') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch all non-template pages for this organization
        const projects = await PageConfig.find({
            organizationId: orgId,
            isTemplate: false,
            status: { $ne: 'Deleted' }
        })
            .select('_id title slug projectUUID taskUUID status createdAt')
            .sort({ createdAt: -1 })
            .lean();

        console.log(`✅ Found ${projects.length} projects for org ${orgId}`);

        res.json({
            success: true,
            count: projects.length,
            projects: projects.map(p => ({
                _id: p._id,
                title: p.title,
                slug: p.slug,
                projectUUID: p.projectUUID,
                taskUUID: p.taskUUID,
                status: p.status,
                createdAt: p.createdAt
            }))
        });

    } catch (error) {
        console.error('❌ Failed to fetch projects:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;