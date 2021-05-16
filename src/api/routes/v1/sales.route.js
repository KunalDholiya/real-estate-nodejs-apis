const express = require('express');
const controller = require('../../controllers/sales.controller');
const { protect } = require('./../../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, controller.addSales);

router.route('/:id')
    .put(protect, controller.updateSales);

router.route('/')
    .get(protect, controller.getSales);

router.route('/:id')
    .get(protect, controller.getSalesById);

router.route('/project/:id')
    .get(protect, controller.getSalesByProjectId);

router.route('/delete/:id')
    .put(protect, controller.deleteSales);

router.route('/status-change/:id')
    .put(protect, controller.salesStatusChange);

module.exports = router;