(function () {
    angular
        .module("project")
        .controller("movieController", movieController);

    function movieController($routeParams, homeService) {
        var model = this;
        var id = $routeParams.movieId;
        function init() {
            homeService
                .findMovieById(id)
                .then(function (movie) {
                    model.movie = movie;
                });

        }init();


    }

})();