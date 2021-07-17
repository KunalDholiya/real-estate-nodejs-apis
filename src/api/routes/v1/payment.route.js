const express = require('express');
const controller = require('../../controllers/payment.controller');
const { protect } = require('./../../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, controller.addPayment);

router.route('/received-payment')
    .get(protect, controller.getReceivedPayments);

router.route('/received-payment/:id')
    .get(protect, controller.getReceivedPaymentByContact);

router.route('/due-payment')
    .get(protect, controller.getDuePayments);

router.route('/delete/:id')
    .put(protect, controller.deleteReceivedPayment);

router.route('/:id')
    .put(protect, controller.editReceivedPayment);

module.exports = router;