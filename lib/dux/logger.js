var colors = require('colors'),

    // Enabled log levels
    enabled = {
        // 0 is disabled
        'silly'    : 0,
        'verbose'  : 0,
        'debug'    : 0,

        // 1 is enabled
        'info'     : 1,
        'help'     : 1,
        'data'     : 1,
        'warn'     : 1,
        'error'    : 1,
        'input'    : 1,
        'prompt'   : 1,
        'all'      : 1
    },

    // Level mapping colors
    mappings = {
        'silly'    : 'magenta',
        'input'    : 'grey',
        'verbose'  : 'cyan',
        'prompt'   : 'grey',
        'info'     : 'green',
        'data'     : 'grey',
        'help'     : 'cyan',
        'warn'     : 'yellow',
        'debug'    : 'blue',
        'error'    : 'red',
        'all'      : 'white'
    },

    // Shortened versions of the levels
    shorts = {
        'silly'    : 'SILY: ',
        'input'    : 'INPT: ',
        'verbose'  : 'VERB: ',
        'prompt'   : 'PRMT: ',
        'info'     : 'INFO: ',
        'data'     : 'DATA: ',
        'help'     : 'HELP: ',
        'warn'     : 'WARN: ',
        'debug'    : 'DBUG: ',
        'error'    : 'EROR: ',
        'all'      : 'ALLL: ',
    },

    // Padded versions of the levels
    fulls = {
        'silly'    : 'silly:   ',
        'input'    : 'input:   ',
        'verbose'  : 'verbose: ',
        'prompt'   : 'prompt:  ',
        'info'     : 'info:    ',
        'data'     : 'data:    ',
        'help'     : 'help:    ',
        'warn'     : 'warn:    ',
        'debug'    : 'debug:   ',
        'error'    : 'error:   ',
        'all'      : 'all:     ',
    },

    // Short level prefix flag
    short_enabled = false;

// Color a log level prefix
function colorlevel (level, pre) {
    return colors[mappings[level]](pre);
};

// ### Logger.set_levels(max_level)
// #### max_level `{String}` Highest level allowed to log at.
// Note this uses the implicit order in an object. This may become unstable
// for some versions of the JS engine and is not guaranteed. I will look at
// better options at some later point. **It works for now.**
exports.set_levels = function set_levels (max_level) {
    var maxed = false;
    for (level in enabled) {
        enabled[level] = !maxed ? 1 : 0;

        if (level === max_level) {
            maxed = true;
        }
    }
};

// ### Logger.short(flag)
// #### flag `{Boolean}` False to disable, undefined or true to enable
// Shortens log level prefixes to a standard 4 character string.
exports.short = function short (flag) {
    short_enabled = (typeof flag !== 'undefined') ? flag : true;
};

// ### Logger.log(level, msg)
// #### level `{String}` Log level to output
// #### msg `{String}` Message string to output.
// Low-level log access function. All level filtering happens here.
exports.log = function log (level, msg) {

    if (enabled[level] && mappings[level]) {
        console.log(colorlevel(level, (short_enabled ? shorts[level] : fulls[level])), msg);
    }
};

// Now setup out other shortcut exports
for (var level in mappings) {
    (function (level) {
        exports[level] = function () {
            var msg = Array.prototype.slice.call(arguments).join(" ");
            exports.log(level, msg);
        };
    }(level));
}