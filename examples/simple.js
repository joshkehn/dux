var dux = require('../lib/dux');

dux.config({
    'debug' : {
        boolean : true,
        default : false
    }
});

// Check the deubgging flag
if (dux.options.debug) {
    dux.logger.info('Debugging ' + 'enabled'.green);
    dux.logger.set_levels('all');
}

// Override the default command, setting it to `'hw'` instead of `'help'`.
dux.default('hw');

// Add the `hello` command.
dux.commands.add('hw', function () {
    dux.logger.info('Hello, world!');
});

// Start dux.
dux.start();