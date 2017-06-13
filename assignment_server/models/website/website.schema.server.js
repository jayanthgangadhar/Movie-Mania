var mongoose = require('mongoose');
// var userModel = require("../user/user.model.server");
var websiteSchema = mongoose.Schema({
    _user:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    name:String,
    description:String,
    pages: [{type:mongoose.Schema.Types.ObjectId, ref:"pageModel"}],
    dateCreated:{type:Date,default:Date.now()}
},{collection:"websites"});

module.exports = websiteSchema;