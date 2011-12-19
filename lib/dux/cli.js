var optimist = require('optimist'),
    colors = require('colors'),
    defaults = require('./config');

// ### Cli.argv
// Optimist `argv` object returned after parsing.
exports.argv = optimist.options(defaults).argv;

// ### Cli.configure(conf)
// #### conf `{Object}` Options to configure against
// Re-run optimist using the new options and reset `exports.argv`.
exports.configure = function configure (conf) {
    exports.argv = optimist.options(conf).argv;
};