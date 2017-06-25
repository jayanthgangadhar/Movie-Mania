var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost:27017/project_jay'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139781.mlab.com:39781/heroku_fcxk1trj'; // user yours
}

mongoose.connect(connectionString);
var db = mongoose.connection;
db.once('open', function() {
    console.log("connected")
});
mongoose.Promise = require('q').Promise;

require('./services/home.service.server');
require('./services/user.service.server');
require('./services/review.service.server');
require('./services/message.service.server');
require('./services/following.service.server');
