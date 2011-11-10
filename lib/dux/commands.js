var log = require('./logger').Logger(),
    fs = require('fs'),
    path = require('path'),
    commandExport = exports,
    commands = commandExport.commands = {};

// Read all commands out of `./commands/` directory.
fs.readdirSync(path.join(__dirname, 'commands')).forEach(function (cmd) {
    log.silly('Importing ' + cmd.underline);

    cmd = cmd.replace('.js', '');
    commands.__defineGetter__(cmd, function () {
        return require('./commands/' + cmd);
    });
});

// ### Commands.run
// #### cmd `{Array}` Command path
// #### callback `{Function}` Callback function
// Executes the first array item with all the subsequent (if any)
// items as parameters.
exports.run = function (cmd, callback) {
    // Shift the name off of `cmd`.
    var name = cmd.shift();
    log.silly('Running ' + name.underline);

    if (!commands[name]) {

        // Command doesn't exist.
        log.silly('Unable to find ' + name.magenta + ' in command list.');
        return callback(new Error('Unknown command ' + name.magenta + ' passed.'));
    } else {

        // Execute command with any additional arguments.
        log.silly('Calling ' + name.underline + ' with ' + cmd.join(' '));

        try {
            commands[name].call({args : cmd}, callback);
        } catch (except) {
            log.silly('Exception encountered when running ' + name.magenta);
            log.silly(except);
            return callback(new Error('Exception encountered when running ' + name.magenta));
        }
    }
};

// ### Commands.add
// #### name `{String}` Name of command
// #### fn `{Function}` Callback function
// `fn` takes arguments (`callback`) and is executed with a scope of
// `this.args` which contains any subsequent commands.
exports.add = function (name, fn) {
    commands[name] = fn;
};