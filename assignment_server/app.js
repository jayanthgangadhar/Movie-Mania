var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/webDev'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139781.mlab.com:39781/heroku_fcxk1trj'; // user yours
}

mongoose.Promise = require('q').Promise;
require('./services/user.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
require('./services/page.service.server');


