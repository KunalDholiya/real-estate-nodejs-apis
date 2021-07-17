const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  register: {
    body: {
      owner_name: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please enter owner name!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      company_name: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please enter company name!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      company_email: Joi.string()
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
      company_website: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please enter email!";
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
      company_phone_no: Joi.string()
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
      company_address: Joi.string()
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
  },

  updateUser: {
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
  },

  // POST /v1/auth/login
  login: {
    body: {
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
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Please add password!";
                break;
              default:
                break;
            }
          });
          return errors;
        })
    },
  },

  // POST /v1/auth/refresh
  sendPasswordReset: {
    body: {
      email: Joi.string()
        .email()
        .required(),
    },
  },

  // POST /v1/auth/password-reset
  passwordReset: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
      resetToken: Joi.string().required(),
    },
  },
};