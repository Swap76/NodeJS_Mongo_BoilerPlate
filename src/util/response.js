const logger = require('../lib/logger/bunyan');

class SendResponse {

    errorMsg(req, res, status, message, error, scope) {
        console.log(error);
        logger.logResponse(req.id, {
            status: status,
            message: message
        }, 200);
        res.status(status).json({
            message: message
        });
    };

    successMsg(req, res, status, data, message) {
        logger.logResponse(req.id, {
            status: status,
            message: message,
            data: data
        }, 200);
        res.status(status).json({
            message: message,
            data: data
        })
    };

    customMsg(req, res, status, message) {
        logger.logResponse(req.id, {
            status: status,
            message: message
        }, 200);
        res.status(status).json({
            message: message
        })
    };
};

module.exports = new SendResponse();