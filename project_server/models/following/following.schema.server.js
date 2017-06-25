var mongoose = require("mongoose");

var FollowingSchema = mongoose.Schema({
    following_name: String,
    _following: {type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    follower_name: String,
    _follower: {type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    date: { type: Date, default: Date.now }
}, {collection: 'following'});

module.exports = FollowingSchema;