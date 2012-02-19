# Dux

What is Dux?

Dux is a scaffold for building a command line tool that executes arbitrary JavaScript. It takes a lot of influence from the wonderful [jitsu][nj jitsu] application by the [Nodejitsu][nj] team. It comes pre-packaged with a simple cli logger and the [optimist][substack/optimist] option parser.

## Usage

There is a simple example located at `examples/simple.js`.

First pass in any configurable options into dux. Valid optimist config objects will work.

    dux.config({
        'debug' : {
            boolean : true,
            default : false
        }
    });

Next we check that debug flag to see if it's been tripped. In future versions of dux, the debug flag will be a self-contained option. For now it's exposed for you to handle manually.

    // Check the debugging flag
    if (dux.options.debug) {
        dux.logger.info('Debugging ' + 'enabled'.green);
        dux.logger.set_levels('all');
    }

Now we add a simple command and set that as the default command to execute, given no other options.

    // Override the default command, setting it to `'hw'` instead of `'help'`.
    dux.default('hw');

    // Add the `hello` command.
    dux.commands.add('hw', function () {
        dux.logger.info('Hello, world!');
    });

In the case that you do not default a command, `help` is chosen as the default one. Should an application not provide a help, dux will output it's own help. Dux will provide a command list helper (`dux.help()`) that you can attach to output all attached commands.

    // Attach the `dux.help`
    dux.commands.add('help', dux.help);
    // Now calling `script.js help` will execute `dux.help`
    // and output a list of attached commands.

After all the commands are added, tell dux to start running.

    // Start dux.
    dux.start();

`dux.start` can take an optional callback function. If provided control passes to that once all the commands are run. You can do pre and post work in this fashion.

    function pre_dux (cont) {
        // do some work
        cont();
    }

    function post_dux (err) {
        // Finish some work
        process.exit(err ? 1 : 0);
    }

    pre_dux(function () {
        dux.start(post_dux);
    });

## License

Copyright (c) 2011 Joshua Kehn <josh@kehn.io> http://joshuakehn.com

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


[nj jitsu]: https://github.com/nodejitsu/jitsu
[nj]: http://nodejitsu.com/
[substack/optimist]: https://github.com/substack/node-optimist