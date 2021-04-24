const express = require('express');
const authRoutes = require('./auth.route');
const teamRoutes = require('./team.route');
const projectRoutes = require('./project.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/team', teamRoutes);
router.use('/project', projectRoutes);

module.exports = router