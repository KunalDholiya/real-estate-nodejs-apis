const express = require('express');
const controller = require('../../controllers/lead.controller');
const { protect } = require('./../../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, controller.addLead);

router.route('/:id')
    .put(protect, controller.updateLead);

router.route('/')
    .get(protect, controller.getLeads);

router.route('/:id')
    .get(protect, controller.getLeadById);

router.route('/:id')
    .put(protect, controller.deleteLead);

router.route('/:id')
    .put(protect, controller.leadStageChange);

module.exports = router;