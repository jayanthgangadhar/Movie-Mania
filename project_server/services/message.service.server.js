var app = require("../../express");
var http = require("http");
var messageModel = require("../models/message/message.model.server");

app.post("/api/message", createMessage);
app.get("/api/message/user/:userId", findAllmessagesforId);
app.delete("/api/delete/:mid", deleteMessage);
app.delete("/api/messages/:uid",deleteMessagesforUser);

function createMessage(req, res) {
    var message = req.body;
    messageModel.createMessage(message)
        .then(function (message) {
            res.json(message);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function deleteMessagesforUser(req, res) {
    var userID = req.params.uid;
    messageModel.deleteMessagesforUser(userID)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function deleteMessage(req, res) {
    var mid = req.params.mid;
    messageModel.deleteMessage(mid)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllmessagesforId(req, res) {
    var userID = req.params.userId;
    messageModel.findAllmessagesforId(userID)
        .then(function (message) {
            res.json(message);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}
