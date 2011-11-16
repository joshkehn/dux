var log = require('./dux/logger').Logger(),
    colors = require('colors'),
    dux_cli = require('../lib/dux/cli'),
    dux = exports;

// Export logger
dux.logger = log;


log.silly('Importing dux commands.');
dux.commands = require('./dux/commands');

require('pkginfo')(module, 'version');

// ### Dux.config
// #### options `{Object}` Config options
// Use `options` instead of default options for optimist parsing
dux.config = function config (file) {
    if (dux.started) {
        log.error('Unable to configure after starting dux.')
    } else {
        dux_cli.configure(file);
        dux.options = dux_cli.argv;
    }
};

// ### Dux.start
// #### argv `{Object}` Argument object from optimist
// #### done `{Function}` Function to pass control to when done.
// Starts Dux.
dux.start = function start (argv, done) {
    var command;
    argv = argv ? argv : dux_cli.argv;
    dux.options = argv;
    command = argv._;

    // Bypass for -v / --version flag or version command
    if (argv.version || argv.v || command.indexOf('version') !== -1) {
        console.log('v' + dux.version);
        process.exit(-1);
    }

    // Setup our colors
    (typeof argv.colors == 'undefined' || argv.colors) || (colors.mode = 'none');

    // Default command is `help`.
    command[0] || (command[0] = 'help');

    // Greet the humans
    dux.welcome();

    // Execute
    return dux.exec(command, done);
};

// ### Dux.welcome
// Prints welcome message
dux.welcome = function welcome () {
    log.info('Welcome to', 'Dux'.grey);
    log.info('It works if it ends with ' + 'Dux '.grey + 'ok'.green);
};

// ### Dux.exec
// #### cmd `{String}` Command to execute
// #### callback `{Function}` Callback function
// Runs the specified command
dux.exec = function exec (cmd, callback) {
    if (!dux.started) {
        dux.setup(dux.exec.bind(this, cmd, callback));
    } else {
        log.info('Executing command path ' + cmd.join(' ').magenta);
        dux.commands.run(cmd, function (err) {
            if (err) {
                dux.error(err);
            }

            if (typeof callback === 'function') {
                callback(err);
            } else {
                process.exit(err ? 1 : 0);
            }
        });
    }
};

// ### Dux.setup
// #### callback `{Function}` Callback function
dux.setup = function setup (callback) {
    if (dux.started) {
        return callback();
    }

    // TODO: Allow actions to continue asynchronously here.
    require('./dux/exit');
    dux.started = true;
    return callback();
};

// ### Dux.error
// #### msg `{String}` Error message
// Display an error message and exit(1).
dux.error = function error (msg, skip) {
    if (!skip) {
        log.error(msg);
    }
    process.exit(1);
};