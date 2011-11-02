var winston = require('winston'), log;

winston.loggers.add('dux-default', {
    console : {
        level : 'info'
    }
});

winston.loggers.add('dux-debug', {
    console : {
        level : 'silly'
    }
});

// Export logger
exports.Logger = function Logger () {
    return log;
};

// Normal switch
exports.normal = function normal () {
    log = winston.loggers.get('dux-default');
    log.cli();
};

// Debug switch
exports.debug = function debug () {
    log = winston.loggers.get('dux-debug');
    log.cli();
};

// Enable normal
module.exports.normal();