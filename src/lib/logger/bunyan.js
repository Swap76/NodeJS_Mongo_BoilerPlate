import bunyan from 'bunyan';

exports.loggerInstance = bunyan.createLogger({
    name: 'Req Logger',
    serializers: {
        req: require('bunyan-express-serializer'),
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    },
    streams:[
        {
            level: 'info',
            path: require("path").join(process.cwd(), `logs/reqRes.log`)  // log ERROR and above to a file
        }
    ]
});

exports.logResponse = function (id, body, statusCode) {
    var log = this.loggerInstance.child({
        id: id,
        body: body,
        statusCode: statusCode
    }, true)
    log.info('response')
}