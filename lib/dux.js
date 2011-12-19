var log = require('./dux/logger'),
    colors = require('colors'),
    dux_cli = require('../lib/dux/cli'),
    default_command = 'help',
    dux = exports;

// Export logger
dux.logger = log;

// Start our import of commands.
log.silly('Importing dux commands.');
dux.commands = require('./dux/commands');

require('pkginfo')(module, 'version');

// ### Dux.config(file)
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

// ### Dux.debug(quiet)
dux.debug = function debug (quiet) {
    if (dux.started && !quiet) {
        log.warn('Changing configuration after startup may cause issues.');
    }
};

// ### Dux.start(argv, done)
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

    // Default command
    command[0] || (command[0] = default_command);

    // Greet the humans
    dux.welcome();

    // Execute
    return dux.exec(command, done);
};

// ### Dux.welcome()
// Prints welcome message
dux.welcome = function welcome () {
    log.info('Welcome to', 'Dux'.grey);
    log.info('It works if it ends with ' + 'Dux '.grey + 'ok'.green);
};

// ### Dux.help()
// Helper function that outputs all commands currently attached
// to the main dux object.
dux.help = function help () {
    log.info('Commands currently attached to', 'dux'.cyan);
    dux.commands.list().forEach(function (cmd) {
        log.info(' - '.grey, cmd.green);
    });
};

// ### Dux.exec(cmd, callback)
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

// ### Dux.default_command(cmd)
// #### cmd `{String}` Command to default to
// The default command path is `help`, but this allows you to alter that.
dux.default = function default_fn (cmd) {
    if (!dux.started) {
        log.silly('Changing default command to', cmd);
        default_command = cmd;
    } else {
        log.error('Unable to change default after starting', 'dux'.cyan);
    }
};

// ### Dux.setup(callback)
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

// ### Dux.error(msg, skip)
// #### msg `{String}` Error message
// #### skip `{Boolean}` True to skip logging the error.
// Display an error message and exit(1).
dux.error = function error (msg, skip) {
    if (!skip) {
        log.error(msg);
    }
    process.exit(1);
};