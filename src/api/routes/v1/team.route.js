const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/team.controller');
const { protect } = require('./../../middleware/auth');

const {
  addTeamMember,
  updateTeamMember
} = require('../../validations/team.validation');

const router = express.Router();

router.route('/')
  .post(protect, validate(addTeamMember), controller.addTeamMember);

router.route('/:id')
  .post(protect, validate(updateTeamMember), controller.updateTeamMember);

router.route('/')
  .get(protect, controller.getMembers);

module.exports = router;