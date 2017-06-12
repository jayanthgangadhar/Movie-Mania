var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/user/:userId', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

function deleteUser(req,res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);

        })


}

function updateUser(req,res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId,user)
        .then(function (status) {
            res.send(status);

        })
    // for(var u in users){
    //     if (users[u]._id === userId){
    //         users[u] = user;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }res.sendStatus(400);

}

function createUser(req,res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);

        })
}

function findUserById (req,res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
                res.json(user);

        },function () {
            res.sendStatus(404);

        })
    // for(var u in users){
    //     if(users[u]._id === userId){
    //         res.send(users[u]);
    //         return;
    //     }
    // }res.sendStatus(404);

}

function findUserByCredentials (req,res) {

    var username = req.query.username;
    var password = req.query.password;
    if(username && password){
        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                if(user){
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }

            });
    }

    else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            });
    }
    else{
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);

            })

    }
}





