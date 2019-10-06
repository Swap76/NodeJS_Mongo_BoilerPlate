const __ = require('../../util/response'),
    Joi = require('joi');

class UserValidator {

    async user(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().email(),
            password: Joi.string().required()
        });

        try {
            let result = await Joi.validate(req.body, schema);
            if (result) return next();
        } catch (error) {
            __.errorMsg(req, res, 400, error.details[0].message, error)
        };
    };
};


module.exports = new UserValidator();