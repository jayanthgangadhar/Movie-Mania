var app = require("../../express");
var http = require("http");
var reviewModel = require("../models/review/review.model.server");

app.post("/api/user/:id/review", createReview);
app.post("/api/user/del/:userId/review", deleteReviewsforUser);
app.get("/api/user/:userId/review", findAllReviews);
app.get("/api/rest/:mid/review", findUserReviewsforMovie);
app.get("/api/rest/:mid/critic/review", findCriticReviewsforMovie);
app.get("/api/review/:reviewId", findReviewById);
app.put("/api/review/:reviewId", updateReview);
app.delete("/api/review/:reviewId", deleteReview);

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

function deleteReviewsforUser(req, res) {
    var userID = req.params.userId;
    console.log("Boli" + userID)
    reviewModel
        .deleteReviewsforUser(userID)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllReviews(req, res) {
    var userId = req.params.userId;
    reviewModel
        .findAllReviews(userId)
        .then(function (reviews) {
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findUserReviewsforMovie(req, res) {
    var movieId = req.params.mid;
    reviewModel
        .findUserReviewsforMovie(movieId)
        .then(function (reviews) {
            // console.log("reviews:"+reviews);
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findCriticReviewsforMovie(req, res) {
    var movieId = req.params.mid;
    reviewModel
        .findCriticReviewsforMovie(movieId)
        .then(function (reviews) {
            // console.log("reviews:"+reviews);
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findReviewsforMovie(req, res) {
    var movieId = req.params.mid;
    reviewModel
        .findReviewsforMovie(movieId)
        .then(function (reviews) {
            // console.log("reviews:"+reviews);
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findReviewById(req, res) {
    var ReviewId = req.params.reviewId;
    reviewModel
        .findReviewById(ReviewId)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function updateReview(req, res) {
    var reviewId = req.params.reviewId;
    var review = req.body;
    reviewModel
        .updateReview(reviewId, review)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function deleteReview(req, res) {
    var reviewId = req.params.reviewId;
    reviewModel
        .deleteReview(reviewId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}