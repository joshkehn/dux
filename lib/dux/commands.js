var log = require('./logger'),
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

// ### Commands.run(cmd, callback)
// #### cmd `{Array}` Command path
// #### callback `{Function}` Callback function
// Executes the first array item with all the subsequent (if any)
// items as parameters.
exports.run = function run (cmd, callback) {
    var name;

    if (typeof cmd === 'string') {
        name = cmd;
        cmd = [];
    } else {
        // Shift the name off of `cmd`.
        name = cmd.shift();
    }

    if (typeof callback !== 'function') {
        log.silly('Adding default callback function where none existed.');
        callback = function () {};
    }

    log.silly('Running ' + name.underline);

    if (!commands[name]) {

        // Command doesn't exist.
        log.silly('Unable to find ' + name.magenta + ' in command list.');
        return callback(new Error('Unknown command ' + name.magenta + ' passed.'));
    } else {

        // Execute command with any additional arguments.
        log.silly('Calling ' + name.underline + ' with ' + (cmd.length > 0 ? cmd.join(' ') : '[no args]'.blue));

        try {
            commands[name].call({args : cmd}, callback);
        } catch (except) {
            log.silly('Exception encountered when running ' + name.magenta);
            log.silly(except);
            return callback(new Error('Exception encountered when running ' + name.magenta));
        }
    }
};

// ### Commands.add(name, fn)
// #### name `{String}` Name of command
// #### fn `{Function}` Callback function
// `fn` takes arguments (`callback`) and is executed with a scope of
// `this.args` which contains any subsequent commands.
exports.add = function add (name, fn) {
    commands.__defineGetter__(name, function () {
        return fn;
    });
};

// ### Commands.list()
// List all commands available
exports.list = function list () {
    var list = [];
    for(var item in commands) {
        list.push(item);
    }
    return list;
}