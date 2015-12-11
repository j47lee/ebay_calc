var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var uriUtil = require('mongodb-uri');

//setup public assets
app.use('/assets', express.static(__dirname + '/public'));

var configDB = require('./config/database.js');

// configuration ===============================================================
//set up database (convert standard MongoDB connection string format to the one that Mongoose expects)
var mongodbUri = configDB.url;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri);

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'sessionsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);





// var express = require('express');
// var app = express();
// var mongoose = require('mongoose');
// var uriUtil = require('mongodb-uri');
// var port = process.env.PORT || 8080;
// var passport = require('passport');
// var flash    = require('connect-flash');
// var session      = require('express-session');
//
// //setup public assets
// app.use('/assets', express.static(__dirname + '/public'));
//
// //set up database (convert standard MongoDB connection string format to the one that Mongoose expects)
// var mongodbUri = require('./config/database').url;
// var mongooseUri = uriUtil.formatMongoose(mongodbUri);
// mongoose.connect(mongooseUri);
//
// //set up views engine to ejs
// app.set('views', __dirname + '/public/views');
// app.set('view engine', 'ejs');
//
// app.use(session({ secret: 'sessionsecret' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session
//
// //bring in routes
// require('./app/routes.js')(app, passport);
// require('./config/passport')(passport); // pass passport for configuration
//
// app.listen(port);
// console.log('Listening to', port);
