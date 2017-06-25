var mongoose = require("mongoose");
// var websiteModel = require("../website/website.model.server");


var MessageSchema = mongoose.Schema({
    from: String,
    from_id: String,
    message: String,
    to: String,
    to_id: String,
    date: { type: Date, default: Date.now }
}, {collection: 'project.messages'});

module.exports = MessageSchema;