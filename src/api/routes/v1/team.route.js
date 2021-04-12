const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/team.controller');
const { protect } = require('./../../middleware/auth');

const {
  addTeamMember
} = require('../../validations/team.validation');

const router = express.Router();

router.route('/add')
  .post(protect, validate(addTeamMember), controller.addTeamMember);


module.exports = router;