var dux = require('../lib/dux');

dux.commands.add('say', function () {
    dux.logger.info('Saying ' + this.args.join(' '));
});

dux.start();