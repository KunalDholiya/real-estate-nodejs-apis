const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const { protect } = require('./../../middleware/auth');

const {
  login,
  register,
  updateUser
} = require('../../validations/auth.validation');

const router = express.Router();

router.route('/register')
  .post(validate(register), controller.register);

router.route('/login')
  .post(validate(login), controller.login);

router.route('/me')
  .get(protect('USER_ME'), controller.me);

router.route('/user/:id')
  .put(protect, validate(updateUser), controller.updateUser);

router.route('/user')
  .get(protect, controller.getUsers);

module.exports = router;