var app = require("../../express");
var http = require("http");
var userModel = require("../models/user/user.model.server");

app.post("/api/following", addFollowing);
app.get("/api/user/following/:userId", findAllfollowingforId);
app.get("/api/user/followers/:userId", findAllfollowersforId);
app.post("/api/following/delete", remFollowing);

function addFollowing(req, res) {
    var following = req.body;
    userModel.startFollowing(following)
        .then(function (message) {
            res.json(message);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function remFollowers(req, res) {
    var following = req.body;
    userModel
        .remFollower(following._follower, following._following)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function createReview(req, res) {
    var userId = req.params.id;
    var newreview = req.body;
    newreview._user = userId;
    reviewModel
        .createReview(newreview, userId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}


function remFollowing(req, res) {
    console.log("_____remfollowing_______");
    var following = req.body;
    console.log(following);
    userModel
        .remFollowing(following._following, following._follower)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}


function findAllfollowingforId(req, res) {
    var userID = req.params.userId;
    userModel.findAllfollowingforId(userID)
        .then(function (following) {
            res.json(following);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllfollowersforId(req, res) {
    var userID = req.params.userId;
    userModel.findAllfollowersforId(userID)
        .then(function (followers) {
            console.log("FOllowers:" +followers);
            res.json(followers);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

