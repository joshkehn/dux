var winston = require('winston'), log;

winston.loggers.add('dux-default', {
    console : {
        level : 'info'
    }
});

log = winston.loggers.get('dux-default');
log.cli();

// Export logger
exports.Logger = function Logger () {
    return log;
};