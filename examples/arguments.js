var dux = require('../lib/dux'), config;

argumentsConfig = {
    'debug' : {
        boolean : true,
        default : false
    },
    'host' : {
        string : true,
        default : '127.0.0.1'
    }
};

dux.config(argumentsConfig);

// Check the deubgging flag
if (dux.options.debug) {
    dux.logger.info('Debugging ' + 'enabled'.green);
    dux.logger.set_levels('all');
}

// Add our `connect` command and set it as the default
dux.default('connect');
dux.commands.add('connect', function (ret) {
    var opts = this.args;

    // Check our arguments for a remote option. It is good practice to encapsulate
    // some options inside the commands if they are particular to the command
    // itself. Other options that are used throughout many commands should be in
    // the global config object.
    if (opts[0] === 'remote') {
        dux.logger.info('Attempting to connect to remote host', dux.options.host.yellow);
        if (dux.options.host === argumentsConfig.host.default) {
            return ret('Must specify host when remote option selected.');
        }
    } else {
        dux.logger.info('Attempting to connect to', dux.options.host.yellow);
    }
    dux.logger.warn('Non-functional example.');
    ret();
});

// Start dux.
dux.start();