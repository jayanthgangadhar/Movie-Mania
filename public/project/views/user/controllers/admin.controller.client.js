(function () {
    angular
        .module("project")
        .controller("adminController", adminController);


    function adminController(userService, reviewService, $location, followingService, currentUser){
        var model = this;
        //vm.type = "user";
        //vm.admin = "admin";
        //vm.userID = $routeParams['uid'];
        //var uid = $routeParams['uid'];

        /*



        vm.details = details;
        vm.postmessage = postmessage;*/
        model.followingUsers = [];
        model.followerUsers = [];

        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.view = view;
        model.sendData = sendData;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.logout = logout;
        model.viewFollowing = viewFollowing;
        model.unFollow = unFollow;
        model.clearFollowing = clearFollowing;
        model.user = currentUser;
        model.admin = "ADMIN";


        function clearFollowing() {
            model.followingUsers = [];
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/")
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

        function unFollow(id) {
            model.following = {
                _following : id,
                _follower: model.thisUserID
            };
            followingService
                .remFollowing(model.following)
                .then(function (data) {
                    userService
                        .remFollower(model.following)
                        .then(function (user) {
                            viewFollowing(model.thisUserID)
                        });
                })
        }


        function sendData(review) {
            model.rev = review;
        }


        function viewFollowing(id) {
            console.log(id);
            model.thisUserID = id;
            followingService
                .findAllfollowingforId(id)
                .then(function (following) {
                    console.log(following);
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

        function view(ID, name) {
            model.by = name;
            reviewService
                .findAllReviews(ID)
                .then(function (reviews) {
                    model.reviews = reviews.data;
                });
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
                                init();
                            });
                    })
            }
        }

        function createUser(user) {
            if (user.password !== user.password2){
                model.uerror = "Sorry, the passwords do not match";
                return
            }
            if (typeof user.username === "undefined"){
                model.uerror = "Please enter a valid username";
                return
            }
            if (typeof user.role === "undefined"){
                model.uerror = "Please select a role";
                return
            }
            userService
                .findUserByUsername(user.username)
                .then(function (user) {
                    // console.log(user);
                    model.uerror = "Sorry, that username is taken!";
                }, function (err) {
                    userService
                        .register(user)
                        .then(function (data) {
                            init();
                        })
                });
        }



            function init() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users.data;
                });
        }
        init();

    }
})();