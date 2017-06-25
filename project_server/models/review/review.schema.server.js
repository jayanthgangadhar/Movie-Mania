var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    _user:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    movieID: String,
    user_name: String,
    type: String,
    title: String,
    description: String,
    moviename: String,
    date: { type: Date, default: Date.now }
}, {collection: 'reviews'});

module.exports = reviewSchema;