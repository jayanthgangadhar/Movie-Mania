var app = require('./express');
// var morgan = require('morgan');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));
// app.use(morgan('dev'));

//require ("./public/project/test/app.js");

require("./assignment_server/app");

// require("./public/project/app")


app.listen(process.env.PORT || 5000);