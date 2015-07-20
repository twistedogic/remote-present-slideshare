// This is the server-side file of our mobile remote controller app.
// It initializes socket.io and a new express instance.
// Start it by running 'node app.js' from your terminal.


// Creating an express server

var express = require('express'),
	app = express();

// This is needed if the app is run on heroku and other cloud providers:
var argv = require('minimist')(process.argv.slice(2));
var port = argv.p || 3000;
// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.

var io = require('socket.io').listen(app.listen(port));

//Routes
// var routes = require('./routes/index');

// yql for slides
var slide = require('./lib/slide.js');
var speaker = require('./lib/speaker.js');

// App Configuration

// Make the files in the public folder available to the world
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use('/', routes);
app.get('/', function(req, res) {
    if(!argv.l || !argv.d){
        res.render('default', { title: 'Demo' });
    } else {
        if(argv.d){
            slide(argv.d,function(err,img){
                res.render('index', {
                    title: 'Present',
                    url: img.url
                })
            })
        } else {
            slide(argv.l,function(err,img){
                res.render('index', {
                    title: 'Present',
                    url: img.url
                })
            })
        }
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// This is a secret key that prevents others from opening your presentation
// and controlling it. Change it to something that only you know.

var secret = argv.s || 'kittens';

// Initialize a new socket.io application

var presentation = io.on('connection', function (socket) {

	// A new client has come online. Check the secret key and 
	// emit a "granted" or "denied" message.

	socket.on('load', function(data){

		socket.emit('access', {
			access: (data.key === secret ? "granted" : "denied")
		});

	});

	// Clients send the 'slide-changed' message whenever they navigate to a new slide.

	socket.on('slide-changed', function(data){

		// Check the secret key again

		if(data.key === secret) {

			// Tell all connected clients to navigate to the new slide
			
			presentation.emit('navigate', {
				hash: data.hash
			});
		}

	});

});

console.log('Your presentation is running on ' + port);