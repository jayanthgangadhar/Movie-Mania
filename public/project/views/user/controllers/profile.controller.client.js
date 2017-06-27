(function () {
    angular
        .module("project")
        .controller("profileController",profileController);

    function profileController($location ,userService,currentUser, followingService, homeService, reviewService) {
        var model =this;
        model.userID = currentUser._id;
        model.updateUser = updateUser;
        model.logout = logout;
        model.user = currentUser;
        model.search = search;
        model.deleteUser = deleteUser;
        model.admin = "ADMIN";
        model.selectedMovie = selectedMovie;
        model.generateUrl = generateUrl;
        model.followingUsers = [];
        model.followerUsers = [];


        function init() {
            // console.log(currentUser);
            model.user = currentUser;
            followingService
                .findAllfollowersforId(currentUser._id)
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
                .findAllfollowingforId(currentUser._id)
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


        function search(text) {
            homeService
                .findMovieByTitle(text)
                .then(function(movies){
                        model.movies = movies;
                    }
                )
        }

        function selectedMovie(id) {
            $location.url("/movie/"+id);
        }

        function generateUrl(path) {
            var url = "http://image.tmdb.org/t/p/w185"+path;
            return url;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/")
                })

        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user )
                .then(function () {
                    model.message = "User Updated"
                },function () {
                    model.error = "User cannot be Unregistered"
                })
        }

        function deleteUser(ID) {
            var ans = confirm("Delete user?");
            if (ans) {
                userService
                    .deleteUser(ID)
                    .then(function () {
                        reviewService
                            .deleteReviewsforUser(ID)
                            .then(function (status) {
                                $location.url("/")
                            });
                    })
            }
        }


    }

})();