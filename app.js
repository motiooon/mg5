
/**
 * Module dependencies.
 */

var  express 			= require('express')
  ,  routes 			= require('./routes')
  ,  swig 				= require('swig')
  ,  util 				= require('util');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
	app.register('.html', swig);
	app.set('view engine', 'html');
	app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

swig.init({
    root: __dirname + '/views',
    allowErrors: true // allows errors to be thrown and caught by express
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.post('/photos', routes.photos);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
