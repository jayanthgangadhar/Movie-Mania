var mongoose = require("mongoose");
var followingSchema = require("./following.schema.server");
var followingModel = mongoose.model("followingModel", followingSchema);

followingModel.startFollowing = startFollowing;
followingModel.findAllfollowingforId = findAllfollowingforId;
followingModel.findAllfollowersforId = findAllfollowersforId;
followingModel.unFollow= unFollow;
followingModel.deleteMessagesforUser = deleteMessagesforUser;

module.exports = followingModel;


function startFollowing(following) {
    return followingModel.create(following)
}

function findAllfollowingforId(userID) {
    return followingModel.find({follower_id: userID})
}

function findAllfollowersforId(userID) {
    return followingModel.find({following_id: userID})
}

function unFollow(id) {
    return followingModel.findByIdAndRemove({following_id: id})
}

function deleteMessagesforUser(uid) {
    return followingModel.deleteMany({to_id : uid })
}