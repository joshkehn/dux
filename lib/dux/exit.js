var log = require('./logger').Logger(),
    err;

function exit (code, status) {
    process.removeListener('exit', exit);

    // Exiting with code / status
    code = code || 0;
    if (err || (code !== 0 && code !== -1)) {
        // Error or nonzero code present
        log.info('Dux'.grey + ' not ok'.red.bold);
        process.exit(1);
    } else if (code !== -1) {
        log.silly('Everything looks good.');
        log.info('Dux'.grey + ' ok'.green);
        process.exit(0);
    }
};

process.on('exit', exit);

module.exports = function end (error) {
    if (error) {
        err = error;
    }
}