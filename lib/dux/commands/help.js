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
    'Dux'.cyan + ' is boilerplate for node.js applications. It provides a good',
    'initial structure and a nifty commandline interface for running',
    'commands with options.',
    '',
    'Dux'.cyan + ' makes use of a few packages utilized by npm. Normally you would',
    'set them up yourself and depending on how much time you have build',
    'a structure that offers just enough flexibility for what you need to',
    'get done. ' + 'Dux'.cyan + ' combines these packages in a standard way you get all',
    'the flexiblity you want with none of the inital overhead. Boilerplate',
    'made simple.',
    '',
    'Here is what '.underline + 'dux'.cyan.underline + ' uses:'.underline,
    '',
    '  colors'.green.bold + '      - '.grey + 'Adds nice colorization to output',
    '  winston'.green.bold + '     - '.grey + 'Logging',
    '  optimist'.green.bold + '    - '.grey + 'CLI option parsing',
    '  pkginfo'.green.bold + '     - '.grey + 'Fetches package.info data',
    '',
    'Some more information about how ' + 'dux'.cyan + ' is laid out.',
    '',
    'File system layout'.cyan.bold.underline,
    '',
    '  /'.green.bold + '                  - '.grey + 'Top level application folder.',
    '    /bin'.green.bold + '             - '.grey + 'Executable folder.',
    '      /dux'.green.bold + '           - '.grey + 'Main executable.',
    '    /lib'.green.bold + '             - '.grey + 'JavaScript library folder.',
    '      /dux.js'.green.bold + '        - '.grey + 'Script entry point.',
    '      /dux'.green.bold + '           - '.grey + 'Component folder.',
    '        /cli.js'.green.bold + '      - '.grey + 'Option parser.',
    '        /commands.js'.green.bold + ' - '.grey + 'Command bucket loader.',
    '        /config.js'.green.bold + '   - '.grey + 'Config pieces.',
    '        /logger.js'.green.bold + '   - '.grey + 'Logging instance.',
    '        /commands'.green.bold + '    - '.grey + 'Folder to hold all commands.',
    '',
];

module.exports = function (callback) {
    usage.forEach(function (line) {
        log.help(line);
    });
    callback();
};