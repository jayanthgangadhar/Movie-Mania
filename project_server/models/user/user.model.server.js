var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("userModel", userSchema);
var bcrypt = require("bcrypt-nodejs");

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addReview = addReview;


module.exports = userModel;

function addReview(reviewId,userId) {
    return userModel
        .findUserById(userId)
        .then(
            function (user) {
                user.reviews.push(reviewId);
                return user.save();
            },
            function (error) {
                console.log('error ' + error);
                return error;
            }
        );

}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({"google.id": googleId});
}

function createUser(user) {
    delete user.password2;
    delete user.phone;
    // console.log(user);
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findOne({_id:userId});
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username : username});
}

function findUserByCredentials(username, password) {

    return userModel.findOne({username:username})
        .select('password')
        .then(function (user) {
            if (user){
                if(bcrypt.compareSync(password,user.password)){
                    user.password = null;
                    return user
                }
            }return null;
        });
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id:userId},{$set:newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id:userId});

}