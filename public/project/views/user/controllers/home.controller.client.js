(function () {
    angular
        .module("project")
        .controller("homeController", homeController);

    function homeController($http,  $location, homeService,userService) {

        var model = this;
        // model.user=currentUser;
        model.search = search;
        model.selectedMovie = selectedMovie;
        model.login = login;
        model.register = register;
        model.generateUrl = generateUrl;



        // model.loggedUser = currentUser;

        // console.log(model.movies);
        function init() {
            model.popularMovies = [];
            homeService
                .findPopularMovie()
                .then(function(popMovie){
                    for(movie in popMovie){
                        var popularMov = popMovie[movie];
                        popularMov.url = generateUrl(popularMov.poster_path);
                        // .replace("original","w500");
                        model.popularMovies.push(popularMov);
                        // console.log(model.simMovies);
                    }
                })

        }init();

        function register(user) {
            //console.log(user);
            if (user.password !== user.password2){
                model.uerror = "Sorry, the passwords do not match";
                return
            }
            if (typeof user.username === "undefined"){
                model.uerror = "Please enter a valid username";
                return
            }
            /*if (typeof user.role === "undefined"){
                model.uerror = "Please select a role";
                return
            }*/
            user.role = "ADMIN";
            userService
                .findUserByUsername(user.username)
                .then(function (user) {
                    console.log(user);
                    model.uerror = "Sorry, that username is taken!";
                }, function (err) {
                    userService
                        .register(model.user)
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

        function search(text) {
            homeService
                .findMovieByTitle(text)
                .then(function(movies){
                    model.movies = movies;
                    }
                )
        }

        function selectedMovie(id) {
            $location.url("/user/movie/"+id);
        }

        function generateUrl(path) {
            var url = "http://image.tmdb.org/t/p/w780"+path;
            return url;
        }
    }

})();