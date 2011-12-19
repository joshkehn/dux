var dux = require('../lib/dux');

// Configure dux with options
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

// Check the deubgging flag
if (dux.options.debug) {
    dux.logger.info('Debugging ' + 'enabled'.green);
    dux.logger.set_levels('all');
}
dux.logger.short(dux.options.short);

// Override the default command, setting it to `'hello'` instead
// of `'help'`.
dux.default('hello');

// Add the `hello` command.
dux.commands.add('hello', function () {
    dux.logger.info('Hello ' + dux.options.name.green);
});

// Add the `goodbye` command.
dux.commands.add('goodbye', function () {
    dux.logger.info('Goodbye ' + dux.options.name.green);
});

// Add the `hellogoodbye` command.
dux.commands.add('hellogoodbye', function () {
    dux.commands.run('hello');
    dux.commands.run('goodbye');
});

// Override dux's default help command using the helper.
dux.commands.add('help', dux.help);

// Start dux.
dux.start();