var colors = require('colors'),
    enabled = {
        'silly'    : 0,
        'verbose'  : 0,
        'debug'    : 0,
        'info'     : 1,
        'help'     : 1,
        'data'     : 1,
        'warn'     : 1,
        'error'    : 1,
        'input'    : 1,
        'prompt'   : 1,
        'all'      : 1
    },
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
    short_enabled = false,
    colors_enabled = true;

function colorlevel (level, pre) {
    if (colors_enabled) {
        pre = colors[mappings[level]](pre);
    }

    return pre;
};

exports.set_levels = function set_levels (max_level) {
    var maxed = false;
    for (level in enabled) {
        enabled[level] = !maxed ? 1 : 0;

        if (level === max_level) {
            maxed = true;
        }
    }
};

exports.short = function short (flag) {
    short_enabled = (typeof flag !== 'undefined') ? flag : true;
};

exports.colorize = function colorize (flag) {
    colors_enabled = (typeof flag !== 'undefined') ? flag : true;
};

exports.log = function log (level, msg) {
    if (!colors_enabled) {
        msg = msg.replace(/\u001b\[\d+m/g, '');
    }

    if (enabled[level] && mappings[level]) {
        console.log(colorlevel(level, (short_enabled ? shorts[level] : fulls[level])), msg);
    }
};

for (var level in mappings) {
    (function (level) {
        exports[level] = function () {
            var msg = Array.prototype.slice.call(arguments).join(" ");
            exports.log(level, msg);
        };
    }(level));
}