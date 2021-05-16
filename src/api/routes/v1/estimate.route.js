const express = require('express');
const controller = require('../../controllers/estimate.controller');
const { protect } = require('./../../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, controller.addEstimate);

router.route('/:id')
    .put(protect, controller.updateEstimates);

router.route('/')
    .get(protect, controller.getEstimate);

router.route('/:id')
    .get(protect, controller.getEstimateById);

router.route('/lead/:id')
    .get(protect, controller.getEstimateByLead);

router.route('/delete/:id')
    .put(protect, controller.removeEstimate);

module.exports = router;