(function () {
    angular
        .module("project")
        .factory("followingService", followingService);

    function followingService($http) {

        var api ={
            "addFollowing" : addFollowing,
            "findAllfollowingforId" : findAllfollowingforId,
            "findAllfollowersforId" : findAllfollowersforId,
            "deleteMessagesforUser" : deleteMessagesforUser,
            "remFollowing" : remFollowing
        };
        return api;

        function addFollowing(following) {
            return $http.post("/api/following/" , following);
        }

        function findAllfollowingforId(userID) {
            return $http.get("/api/user/following/" + userID);
        }

        function findAllfollowersforId(userID) {
            return $http.get("/api/user/followers/" + userID);
        }

        function remFollowing(following) {
            // return $http.post("/api/following/remove" , following);
            return $http.post("/api/following/delete" , following);
        }




        function deleteMessagesforUser(uid) {
            return $http.delete("/api/messages/" + uid);
        }
    }

})();