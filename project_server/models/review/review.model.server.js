var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("reviewModel", reviewSchema);
var userModel = require("../user/user.model.server");


reviewModel.createReview = createReview;
reviewModel.findReviewById = findReviewById;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;
reviewModel.findAllReviews = findAllReviews;
reviewModel.findReviewsforMovie = findReviewsforMovie;
reviewModel.deleteReviewsforUser = deleteReviewsforUser;

module.exports = reviewModel;

function createReview(newReview, userId) {
    return reviewModel
        .create(newReview)
        .then(function (review) {
            userModel
                .addReview(review._id, userId );
            return review;
        })
}

function deleteReviewsforUser(userID) {
    return reviewModel.deleteMany({ user : userID })
}

function findReviewById(userId) {
    return reviewModel.findById(userId)
}

function findAllReviews(userId) {
    return reviewModel.find({userID: userId})
}

function findReviewsforMovie(id) {
    return reviewModel.find({movieID: id})
}

function updateReview(reviewID, review) {
    return reviewModel.update(
        { _id : reviewID },
        {
            description: review.description
        })
}

function deleteReview(reviewID) {
    return reviewModel.findByIdAndRemove({_id: reviewID})
}