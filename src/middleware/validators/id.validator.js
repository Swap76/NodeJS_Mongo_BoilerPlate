import __ from '../../util/response',
import mongoose from 'mongoose';

class IdValidator {
    async isValidId(req, res, next) {
            try {
                let result = await mongoose.Types.ObjectId.isValid(req.params.id);
                if (!result) return __.errorMsg(req, res, 400, "Incorrect Id provided", error);
                return next();
            } catch (error) {
                __.errorMsg(req, res, 400, "Incorrect Id provided", error);
            };
    };
};


module.exports = new IdValidator();