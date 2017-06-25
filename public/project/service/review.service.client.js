(function () {
    angular
        .module("project")
        .factory("reviewService", reviewService);

    function reviewService($http) {

        var api ={
            "createReview" : createReview,
            "findReviewById" : findReviewById,
            "updateReview" : updateReview,
            "deleteReview" : deleteReview,
            "findAllReviews" : findAllReviews,
            "findReviewsforMovie" : findReviewsforMovie,
            "deleteReviewsforUser" : deleteReviewsforUser
        };
        return api;

        function createReview(review, userId) {
            // console.log("Review:"+review);
            // console.log("UserId:"+userId);
            return $http.post("/api/user/"+userId+"/review", review);
        }

        function deleteReviewsforUser(userID) {
            return $http.post("/api/user/del/" + userID + "/review");
        }

        function findReviewById(reviewId) {
            return $http.get("/api/review/" + reviewId);
        }

        function updateReview(reviewId, review) {
            return $http.put("/api/review/" + reviewId, review);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/review/" + reviewId);
        }

        function findAllReviews(userID) {
            return $http.get("/api/user/" + userID + "/review");
        }

        function findReviewsforMovie(movieId) {
            return $http.get("/api/rest/" + movieId + "/review");
        }

    }

})();