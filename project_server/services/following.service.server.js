var app = require("../../express");
var http = require("http");
var followingModel = require("../models/following/following.model.server");

app.post("/api/following", startFollowing);
app.get("/api/user/following/:userId", findAllfollowingforId);
app.get("/api/user/followers/:userId", findAllfollowersforId);
app.delete("/api/following/delete/:id", unFollow);

function startFollowing(req, res) {
    var following = req.body;
    followingModel.startFollowing(following)
        .then(function (message) {
            res.json(message);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function unFollow(req, res) {
    var id = req.params.id;
    followingModel.unFollow(id)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}


function findAllfollowingforId(req, res) {
    var userID = req.params.userId;
    followingModel.findAllfollowingforId(userID)
        .then(function (following) {
            res.json(following);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllfollowersforId(req, res) {
    var userID = req.params.userId;
    followingModel.findAllfollowersforId(userID)
        .then(function (followers) {
            res.json(followers);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

