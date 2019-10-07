const 
  __ = require('../../util/response'),
  Joi = require('joi');

class BlogValidator {

  blog(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required().min(4).max(256),
		    content: Joi.string().required().min(8).max(65536)
	    });

    try {
      let result = Joi.validate(req.body, schema);
      if (result) return next();
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error);
    }
  }
}


module.exports = new BlogValidator();