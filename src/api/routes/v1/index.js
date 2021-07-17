const express = require('express');
const authRoutes = require('./auth.route');
const teamRoutes = require('./team.route');
const projectRoutes = require('./project.route');
const estimateRoutes = require('./estimate.route');
const contactRoutes = require('./contact.route');
const activityRoutes = require('./activity.route');
const leadRoutes = require('./leads.route');
const salesRoutes = require('./sales.route');
const paymentRoutes = require('./payment.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/team', teamRoutes);
router.use('/project', projectRoutes);
router.use('/estimate', estimateRoutes);
router.use('/contact', contactRoutes);
router.use('/activity', activityRoutes);
router.use('/lead', leadRoutes);
router.use('/sales', salesRoutes);
router.use('/payment', paymentRoutes);

module.exports = router