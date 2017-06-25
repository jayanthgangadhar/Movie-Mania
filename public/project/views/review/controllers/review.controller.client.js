(function () {
    angular
        .module('project')
        .controller('reviewController', reviewController);

    function reviewController(reviewService, userService, currentUser) {

        var model = this;

        model.userID = currentUser._id;
        model.sendData = sendData;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.submit = submit;
        console.log(model.userID);


        function submit(review) {
            model.rev = review;
            userService
                .findUserById(model.userID)
                .then(function (user) {
                    model.user = user;
                    model.rev.movieID = user._id;
                    model.rev.moviename = "Batman Begins";
                    model.rev.user_name = user.username;
                    model.rev.userID = user._id;
                    reviewService
                        .createReview(review, model.userID)
                        .then(function (newReview) {
                            init();
                            model.rev.description = ""
                        });
                })

        }

        function deleteReview(review) {
            reviewService
                .deleteReview(review)
                .then(function () {
                    init();
                })
        }

        function updateReview(review) {
            model.newRev = review;
            reviewService
                .updateReview(model.newRev._id, model.newRev)
                .then(function () {
                    init();
                })
        }

        function sendData(review) {
            model.rev = review;
        }

        function init() {
            reviewService
                .findAllReviews(model.userID)
                .then(function (reviews) {
                    model.reviews = reviews.data;
                    // console.log(model.reviews)
                });
        }
        init();







    }
})();