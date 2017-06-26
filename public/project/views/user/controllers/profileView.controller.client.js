(function () {
    angular
        .module("project")
        .controller("profileViewController",profileViewController);

    function profileViewController($routeParams,$location ,userService, currentUser, followingService) {
        var model =this;
        var id = $routeParams.id;
        model.logout = logout;
        model.followUser = followUser;
        model.unFollow = unFollow;
        model.cId = currentUser._id;

        function init() {
             userService
                 .findUserById(id)
                 .then(function (user) {
                     console.log(user);
                     model.user = user;
                     checkUser();

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

        function checkUser() {
            var bol = false;
            if (model.cId in model.user.followers){
                console.log("yes");
            }
            console.log("no");
        }

        function unFollow() {
            model.following = {
                _following : model.user._id,
                _follower: currentUser._id
            }
            followingService
                .remFollowing(model.following)
                .then(function (data) {
                    userService
                        .remFollower(model.following)
                        .then(function (user) {
                            model.user = user.data;
                        });
                })
        }

        function followUser() {
            model.following = {
                _following : model.user._id,
                _follower: currentUser._id
            };
            userService
                .addFollowing(model.following)
            .then(function (data) {
                userService
                    .addFollowers(model.following)
                    .then(function (user) {
                        model.user = user.data;
                    })

            })
            /*followingService
                .startFollowing(model.following)
                .then(function (data) {
                    model.follow = data;
                });*/
            //console.log(model.following)
        }


    }

})();