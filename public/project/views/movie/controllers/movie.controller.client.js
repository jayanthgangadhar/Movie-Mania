(function () {
    angular
        .module("project")
        .controller("movieController", movieController);

    function movieController($routeParams, homeService, $sce, userService, $location, currentUser, reviewService) {
        var model = this;
        model.user = currentUser;
        model.userId = currentUser._id;
        var id = $routeParams.movieId;
        model.generateUrl = generateUrl;
        model.logout = logout;
        model.submit = submit;
        // model.postmessage = postmessage;
        model.sendInfo = sendInfo;

        function sendInfo(id) {
            model.proID = id;
            userService
                .findUserById(model.proID)
                .then(function (user) {
                    model.proUser = user;
                });
        }

        // function postmessage(message) {
        //     // console.log(message);
        //     model.message = message;
        //     userService
        //         .findUserById(model.userID)
        //         .then(function (user) {
        //             model.user = user;
        //             model.message.from = currentUser.username;
        //             model.message.from_id = currentUser._id;
        //             model.message.to = "po";
        //             model.message.to_id = "594d608f55186534a045ff63";
        //             MessageService
        //                 .createMessage(model.message.from_id, model.message)
        //                 .then(function (message) {
        //                     model.message = "";
        //                 })
        //         });
        // }


        function submit(review) {
            model.rev = review;
            homeService
                .findMovieById(id)
                .then(function (movie) {
                    model.movie = movie;
                    model.rev.movieID = id;
                    model.rev.moviename = model.movie.original_title;
                    model.rev.user_name = model.user.username;
                    model.rev.userID = model.user._id;
                    reviewService
                        .createReview(review, model.userId)
                        .then(function (newReview) {
                            model.rev.description = "";
                            model.rev.title = "";
                            init();
                        });
                });


        }

        function init() {
            model.actors= [];
            model.urls=[];
            model.simUrls=[];
            model.simMovies=[];
            model.map = {};
            // console.log("USER:"+currentUser._id);
            reviewService
                .findReviewsforMovie(id)
                .then(function (reviews) {
                    model.reviews = reviews.data;
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