const __ = require('../../util/response'),
  Joi = require('joi');

class UserValidator {

  user(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().min(4).max(32).required().trim(),
      email: Joi.string().email().min(8).max(64).required().trim(),
      password: Joi.string().required().min(8).max(32),
      password2: Joi.string().required().min(8).max(32)
    });

    try {
      let result = Joi.validate(req.body, schema);
      if (result) return next();
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error);
    }
  }
}


module.exports = new UserValidator();