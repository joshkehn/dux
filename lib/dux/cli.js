var optimist = require('optimist'),
    colors = require('colors'),
    defaults = require('./config');

exports.argv = optimist.options(defaults).argv;
exports.optimist = optimist;