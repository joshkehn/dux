var dux = require('../lib/dux');

dux.config({
    'name' : {
        default : 'Josh'
    },
    'debug' : {
        alias : 'd',
        boolean : true,
        default : false
    }
});

if (dux.options.debug) {
    dux.logger.info('Debugging ' + 'enabled'.green);
}


dux.commands.add('run', function () {
    if (dux.options.name) {
        dux.logger.info('Hello ' + dux.options.name.green);
    }
});

dux.start();