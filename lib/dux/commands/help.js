var log = require('../logger'),
    usage;

usage = [
    '      dP'.cyan,
    '      88'.cyan,
    '.d888b88 dP    dP dP.  .dP'.cyan,
    '88\'  \'88 88    88  \'8bd8\''.cyan,
    '88.  .88 88.  .88  .d88b.'.cyan,
    '\'88888P8 \'88888P\' dP\'  \'dP'.cyan,
    '',
    'Dux'.cyan + ' is boilerplate for node.js applications. It provides a',
    'nifty commandline interface for running commands with options.',
    '',
    'Dux'.cyan + ' makes use of a few packages utilized by npm. Normally you would',
    'set them up yourself and depending on how much time you have build',
    'a structure that offers just enough flexibility for what you need to',
    'get done. ' + 'Dux'.cyan + ' combines these packages in a standard way you get all',
    'the flexiblity you want with none of the inital overhead.',
    '',
    'Here is what '.underline + 'dux'.cyan.underline + ' uses:'.underline,
    '',
    '  colors'.green.bold + '      - '.grey + 'Adds nice colorization to output',
    '  optimist'.green.bold + '    - '.grey + 'CLI option parsing',
    '  pkginfo'.green.bold + '     - '.grey + 'Fetches package.info data',
];

module.exports = function (callback) {
    usage.forEach(function (line) {
        log.help(line);
    });
    callback();
};