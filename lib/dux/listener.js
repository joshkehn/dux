var log = require('./logger').Logger();

module.exports = function (callback) {
    var start = new Date().getTime(),
        intv = setInterval(function () {
            log.info('Running ' + (new Date().getTime() - start) + ' seconds');
        }, Math.random() * 1000 );

    process.on('SIGINT', function () {
        clearInterval(intv);
        console.log("\r");
        callback(Math.random() > 0.499 ? 'Did not exit cleanly' : null);
    });
}