var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("userModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findOne({_id:userId});
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.find({username : username});
}

function findUserByCredentials(username, password) {

    return userModel.findOne({username:username, password:password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id:userId},{$set:newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id:userId});

}