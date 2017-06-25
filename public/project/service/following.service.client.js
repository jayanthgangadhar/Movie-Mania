(function () {
    angular
        .module("project")
        .factory("followingService", followingService);

    function followingService($http) {

        var api ={
            "startFollowing" : startFollowing,
            "findAllfollowingforId" : findAllfollowingforId,
            "findAllfollowersforId" : findAllfollowersforId,
            "unFollow" : unFollow,
            "deleteMessagesforUser" : deleteMessagesforUser
        };
        return api;

        function startFollowing(following) {
            return $http.post("/api/following/" , following);
        }

        function findAllfollowingforId(userID) {
            return $http.get("/api/user/following/" + userID);
        }

        function findAllfollowersforId(userID) {
            return $http.get("/api/user/followers/" + userID);
        }

        function unFollow(id) {
            return $http.delete("/api/following/delete/" + id);
        }

        function deleteMessagesforUser(uid) {
            return $http.delete("/api/messages/" + uid);
        }
    }

})();