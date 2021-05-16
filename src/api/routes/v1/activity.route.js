const express = require('express');
const controller = require('../../controllers/activity.controller');
const { protect } = require('./../../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, controller.addActivities);

router.route('/:id')
    .put(protect, controller.updateActivity);

router.route('/:id')
    .get(protect, controller.getActivityByLeadId);

module.exports = router;