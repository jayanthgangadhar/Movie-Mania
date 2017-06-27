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
        model.curUser = currentUser;

        function init() {
             userService
                 .findUserById(id)
                 .then(function (user) {
                     // console.log(user);
                     model.user = user;

                 });

            followingService
                .findAllfollowersforId(id)
                .then(function (followers) {
                    model.followers = followers.data[0].followers;
                    model.followers.forEach(function (id) {
                        userService
                            .findUserById(id)
                            .then(function (user) {
                                model.followerUsers.push(user)
                            })
                    });

                });
            followingService
                .findAllfollowingforId(id)
                .then(function (following) {
                    //console.log(following);
                    model.following = following.data[0].following;
                    model.following.forEach(function (id) {
                        userService
                            .findUserById(id)
                            .then(function (user) {
                                model.followingUsers.push(user)
                            })
                    });
                    //
                });
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/")
                })

        }

        function unFollow() {
            model.following = {
                _following : model.user._id,
                _follower: currentUser._id
            };
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
        }


    }

})();