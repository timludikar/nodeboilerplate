var util = require(__dirname + '/../libs/util.js'),
	hbs = require('express3-handlebars');

module.exports = function (express, app) {

    // Common configuration
    app.configure(function () {

        // Configure jQuery template engine
        express.version = require('express/package.json').version;
        app.set('views', __dirname + '/../views');
        app.set('view engine', 'handlebars');
        app.set('layout', true);
        app.engine('handlebars', hbs({defaultLayout: 'layout'}) );
	

        app.use(app.router);

        // Make sure build folders exist
        util.mkdir(__dirname + '/../build');
        util.mkdir(__dirname + '/../build/css');

        // Configure LESS compiler
        app.use('/css', require('less-middleware')({
            src: __dirname + '/../src/less',
            dest: __dirname + '/../build/css'
        }));

        // Create static file servers for the build and public folders
        app.use(express.static(__dirname + '/../build'));
        app.use(express.static(__dirname + '/../public'));
    });

    // Development specific configuration
    app.configure('development', function () {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    // Production specific configuration
    app.configure('production', function () {
        app.use(express.errorHandler());
    });

};