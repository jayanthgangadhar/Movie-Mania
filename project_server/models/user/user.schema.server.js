var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {type:String,unique: true},
    firstname: String,
    lastname: String,
    password: String,
    phone: String,
    email: String,
    role: {type:String, default:'USER', enum:['USER','ADMIN','CRITIC']},
    dateCreated: {type: Date, default: Date.now()},
    facebook: {
        id:    String,
        token: String
    },
    reviews: [{type:mongoose.Schema.Types.ObjectId, ref:"reviewModel"}],
    following: [{type:mongoose.Schema.Types.ObjectId, ref:"userModel"}],
    followers: [{type:mongoose.Schema.Types.ObjectId, ref:"userModel"}]
},{collection: "prouser"});

module.exports = userSchema;