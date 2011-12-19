var dux = require('../lib/dux');

dux.config({
    'name' : {
        default : '[no name]'.red
    },
    'debug' : {
        alias : 'd',
        boolean : true,
        default : false
    },
    'short' : {
        boolean : true,
        default : false
    }
});

if (dux.options.debug) {
    dux.logger.info('Debugging ' + 'enabled'.green);
    dux.logger.set_levels('all');
}
dux.logger.short(dux.options.short);

dux.default('hello');

dux.commands.add('hello', function () {
    dux.logger.info('Hello ' + dux.options.name.green);
});

dux.commands.add('goodbye', function () {
    dux.logger.info('Goodbye ' + dux.options.name.green);
});

dux.commands.add('hellogoodbye', function () {
    dux.commands.run('hello');
    dux.commands.run('goodbye');
});

dux.start();