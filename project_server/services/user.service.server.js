var app = require('../../express');
var passport = require("passport");

var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(localStrategy));

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : "141971539423-3dbq5t12ivrdq1i8u8g8p4kmlu0r3ccb.apps.googleusercontent.com",
    // process.env.GOOGLE_CLIENT_ID,
    clientSecret : "y2BnvmnZyvlmxJbZSXVq8B9Q",
    callbackURL  : "https://jay-webdev.herokuapp.com/auth/google/callback"
};

var userModel = require('../models/user/user.model.server');
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post("/api/following", addFollowing);
app.post("/api/followers", addFollowers);
app.post("/api/remove/user/followers", remFollower);
app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/user/:userId', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);
app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.post  ('/api/assignment/logout',logout);
app.post  ('/api/assignment/register',register);
app.get("/api/assignment/loggedin",loggedin);
app.get ('/auth/google',
    passport.authenticate('google',
        { scope :['profile' , 'email']
        }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));


function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(function (user) {
            if (user){
                return done(null,user);
            }else{
                var email = profile.emails[0].value;
                var emailParts = email.split("@");
                var newGoogleUser = {
                    username: emailParts[0],
                    firstName:profile.name.givenName,
                    lastName:profile.name.familyName,
                    email:email,
                    google:{
                        id:profile.id,
                        token:token
                    }
                };
                return userModel.createUser(newGoogleUser);
            }
        },function (err) {
            if (err){
                return done(err);
            }}

        )
        .then(function (user) {
            return done(null,user);
        },function (err) {
            if(err){
                return done(err);
            }
            
        });
}

function remFollower(req, res) {
    var following = req.body;
    userModel
        .remFollower(following._follower, following._following)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function addFollowing(req, res) {
    var following = req.body;
    userModel
        .addFollowing(following._following, following._follower)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function addFollowers(req, res) {
    var following = req.body;
    userModel
        .addFollowers(following._follower, following._following)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}






function register(req,res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req
                .login(user,function (status) {
                    res.sendStatus(200);
                })
        })

}

function logout(req,res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req,res) {
    if(req.isAuthenticated()){
        res.json(req.user);

    }else{
        res.send('0');
    }
}

function localStrategy(username,password,done) {
    userModel
        .findUserByCredentials(username,password)
        .then(function (user) {
            if (user){
                done(null,user);
            }else{
                done(null,false);
            }
            },function (error) {
            done(error,false);
            
        })

}

function login(req,res) {
    res.json(req.user);
}

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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}





