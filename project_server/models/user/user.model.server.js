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
userModel.addFollowing = addFollowing;
userModel.addFollowers = addFollowers;
userModel.remFollowing = remFollowing;
userModel.remFollower = remFollower;
userModel.findAllfollowingforId = findAllfollowingforId;
userModel.findAllfollowersforId = findAllfollowersforId;
userModel.unFollow= unFollow;
userModel.deleteMessagesforUser = deleteMessagesforUser;



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

function addFollowing(followId,userId) {
    return userModel
        .findUserById(userId)
        .then(
            function (user) {
                user.following.push(followId);
                return user.save();
            },
            function (error) {
                console.log('error ' + error);
                return error;
            }
        );

}


function remFollowing(followId,userId) {
    return userModel
        .findUserById(userId)
        .then(
            function (user) {
                var index = user.following.indexOf(followId);
                user.following.splice(index,1);
                return user.save();
            },
            function (error) {
                console.log('error ' + error);
                return error;
            }
        );

}

function addFollowers(followId,userId) {
    return userModel
        .findUserById(userId)
        .then(
            function (user) {
                user.followers.push(followId);
                return user.save();
            },
            function (error) {
                console.log('error ' + error);
                return error;
            }
        );

}

function remFollower(followId,userId) {
    return userModel
        .findUserById(userId)
        .then(
            function (user) {
                var index = user.followers.indexOf(followId);
                user.followers.splice(index,1);
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


function findAllfollowingforId(userID) {
return userModel.find({_id: userID})
}

function findAllfollowersforId(userID) {
    return userModel.find({_id: userID})
}

function unFollow(id) {
    return userModel.findByIdAndRemove({following: id})
}

function deleteMessagesforUser(uid) {
    return userModel.deleteMany({to_id : uid })
}