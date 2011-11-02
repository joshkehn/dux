var log = require('./dux/logger').Logger(),
    colors = require('colors'),
    dux = exports;

log.silly('Importing dux commands.');
dux.commands = require('./dux/commands');

require('pkginfo')(module, 'version');

// ### Dux.start
// #### argv `{Object}` Argument object from optimist
// #### done `{Function}` Function to pass control to when done.
// Starts Dux.
dux.start = function start (argv, done) {
    var command = argv._;

    // Bypass for -v / --version flag or version command
    if (argv.version || argv.v || command.indexOf('version') !== -1) {
        console.log('v' + dux.version);
        process.exit(-1);
    }

    (typeof argv.colors == 'undefined' || argv.colors) || (colors.mode = 'none');

    command[0] || (command[0] = 'help');

    dux.welcome();
    return dux.exec(command, done);
};

// ### Dux.welcome
// Prints welcome message
dux.welcome = function welcome () {
    log.info('Welcome to', 'Dux'.grey);
    log.info('It works if it ends with ' + 'Dux '.grey + 'ok'.green);
}

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
            callback(err);

            if (err) {
                dux.error(err);
            }
        });
    }
}

// ### Dux.setup
// #### callback `{Function}` Callback function
dux.setup = function setup (callback) {
    if (dux.started) {
        return callback();
    }

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
}