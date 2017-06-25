(function () {
    angular
        .module("project")
        .controller("profileViewController",profileViewController);

    function profileViewController($routeParams,$location ,userService, currentUser, FollowingService) {
        var model =this;
        var id = $routeParams.id;
        model.logout = logout;
        model.followUser = followUser;
        // console.log("USER ID:"+id);

        function init() {
             userService
                 .findUserById(id)
                 .then(function (user) {
                     console.log(user);
                     model.user = user;
                 })
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/")
                })

        }

        function followUser() {
            model.following = {
                following_name: model.user.username,
                _following : model.user._id,
                follower_name: currentUser.username,
                _follower: currentUser._id
            };
            followingService
                .startFollowing(model.following)
                .then(function (data) {
                    model.follow = data;
                });
            //console.log(model.following)
        }


    }

})();