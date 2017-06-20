var app = require('./express');
// var morgan = require('morgan');


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret:'something'}));
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));
// app.use(morgan('dev'));

require("./public/session/app")

require("./assignment_server/app");

// require("./public/project/app")


app.listen(process.env.PORT || 5000);