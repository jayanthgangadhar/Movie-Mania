(function () {
    angular
        .module("project")
        .controller("movieController", movieController);

    function movieController($routeParams, homeService, $sce, userService, $location, currentUser, reviewService) {
        var model = this;
        // model.user = currentUser;
        model.thisUser = currentUser;
        // model.demo = currentUser;
        model.userId = currentUser._id;
        var id = $routeParams.movieId;
        model.generateUrl = generateUrl;
        model.logout = logout;
        model.submit = submit;
        model.login = login;
        model.register = register;
        model.checkEmpty= checkEmpty;
        model.sendInfo = sendInfo;

        function init() {
            model.actors= [];
            model.urls=[];
            model.simUrls=[];
            model.simMovies=[];
            model.map = {};
            // console.log("USER:"+currentUser._id);
            reviewService
                .findUserReviewsforMovie(id)
                .then(function (reviews) {
                    model.reviews = reviews.data;
                    // console.log(model.reviews)
                });
            reviewService
                .findCriticReviewsforMovie(id)
                .then(function (reviews) {
                    model.creviews = reviews.data;
                    // console.log(model.reviews)
                });
            homeService
                .findMovieById(id)
                .then(function (movie) {
                    model.movie = movie;
                });

            homeService
                .findTrailerByMovieid(id)
                .then(function (trailers) {
                    if(trailers.length >= 1){
                        for (trailer in trailers){
                            var url = "https://www.youtube.com/embed/"+trailers[trailer].key;
                            model.urls.push($sce.trustAsResourceUrl(url));
                        }
                    }
                });

            homeService
                .findCastByMovieId(id)
                .then(function (cast) {
                    model.cast = cast;
                });

            homeService
                .findSimilarMovie(id)
                .then(function(simMovie){
                    for(movie in simMovie){
                        var comMovie = simMovie[movie];
                        comMovie.url = generateUrl(simMovie[movie].poster_path);
                        // .replace("original","w500");
                        model.simMovies.push(comMovie);
                        // console.log(model.simMovies);
                    }
                })
        }init();



        function checkEmpty(obj) {
            for (var x in obj) { return false; }
            return true;
        }

        function sendInfo(id) {
            model.proID = id;
            userService
                .findUserById(model.proID)
                .then(function (user) {
                    model.proUser = user;
                });
        }

        function submit(review) {
            model.rev = review;
            homeService
                .findMovieById(id)
                .then(function (movie) {
                    model.movie = movie;
                    model.rev.movieID = id;
                    model.rev.moviename = model.movie.original_title;
                    model.rev.user_name = model.thisUser.username;
                    model.rev.userID = model.thisUser._id;
                    model.rev.userRole = model.thisUser.role;
                    reviewService
                        .createReview(review, model.userId)
                        .then(function (newReview) {
                            model.rev.description = "";
                            model.rev.title = "";
                            init();
                        });
                });


        }

        function register(user) {
            // console.log(user);
            if (user.password !== user.password2){
                model.uerror = "Sorry, the passwords do not match";
                return
            }
            if (typeof user.username === "undefined"){
                model.uerror = "Please enter a valid username";
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
                            $location.url('/user/profile');
                        })
                });
        }

        function login(user) {
            userService
                .login(user.username, user.password)
                .then(function (found) {
                    if (found!== null){
                        $location.url('/user/profile');
                    }
                    else{

                        model.message = "Sorry, " + user.username + " not found.Please try again!"
                    }
                },function (){
                    model.message = "Sorry, " + user.username + " not found.Please try again!"
                });
        }



        function generateUrl(path) {
            var url = "http://image.tmdb.org/t/p/original"+path;
            return url;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/")
                })

        }

    }

})();