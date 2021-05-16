const express = require('express');
const controller = require('../../controllers/project.controller');
const { protect } = require('./../../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, controller.addProject);

router.route('/:id')
    .put(protect, controller.updateProjects);

router.route('/')
    .get(protect, controller.getProjects);

router.route('/:id')
    .get(protect, controller.getProjectById);

router.route('/delete/:id')
    .put(protect, controller.removeProject);

module.exports = router;