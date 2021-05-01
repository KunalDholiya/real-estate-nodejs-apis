const express = require('express');
const controller = require('../../controllers/activity.controller');
const { protect } = require('./../../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, controller.addActivities);

router.route('/:id')
    .put(protect, controller.updateActivity);

router.route('/')
    .get(protect, controller.getProjects);

router.route('/:id')
    .get(protect, controller.getProjectById);

router.route('/:id')
    .post(protect, controller.removeProject);

module.exports = router;