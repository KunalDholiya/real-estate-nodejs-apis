const Joi = require('joi');

module.exports = {
  addTeamMember: {
    body: {
      first_name: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please enter first name!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      last_name: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please enter last name!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      email: Joi.string()
        .required()
        .regex(/\S+@\S+\.\S+/)
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please enter email!";
                break;
              case "string.regex.base":
                err.message = `Please enter valid email address!`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .required()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please add password!";
                break;
              case "string.regex.base":
                err.message = `Password must be a minimum of 8 characters including a number, upper, lower and one special character!`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      phone_number: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please add Mobile!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      address: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please add Address!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    },
  }
};