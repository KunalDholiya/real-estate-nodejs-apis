const express = require('express');
const controller = require('../../controllers/contact.controller');
const { protect } = require('./../../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, controller.addContact);

router.route('/:id')
    .put(protect, controller.updateContact);

router.route('/')
    .get(protect, controller.getContacts);

router.route('/:id')
    .get(protect, controller.getContactById);

router.route('/:id')
    .put(protect, controller.deleteContact);

module.exports = router;