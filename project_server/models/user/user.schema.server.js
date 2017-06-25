var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {type:String,unique: true},
    firstname: String,
    lastname: String,
    password: String,
    phone: String,
    email: String,
    dateCreated: {type: Date, default: Date.now()},
    reviews: [{type:mongoose.Schema.Types.ObjectId, ref:"reviewModel"}]
},{collection: "prouser"});

module.exports = userSchema;