var log = require('../logger').Logger(),
    usage;

usage = [
    '      dP'.cyan,
    '      88'.cyan,
    '.d888b88 dP    dP dP.  .dP'.cyan,
    '88\'  \'88 88    88  \'8bd8\''.cyan,
    '88.  .88 88.  .88  .d88b.'.cyan,
    '\'88888P8 \'88888P\' dP\'  \'dP'.cyan,
    '',
    'You should edit this file.'.red.underline
];

module.exports = function (callback) {
    usage.forEach(function (line) {
        log.help(line);
    });
    callback();
};