(function () {
    angular
        .module("project")
        .controller("homeController", homeController);

    function homeController($http, $location, homeService) {
        var model = this;
        // console.log('hello world');
        // $scope.searchPhotos = searchPhotos;

        model.search = search;
        model.selectedMovie = selectedMovie;

        //
        //
        function search(text) {
            homeService
                .findMovieByTitle(text)
                .then(function(movies){
                    model.movies = movies;
                    }
                )

            // $http.get(url)
            //     .then(renderMovies)
        }
        
        // function renderMovies(response) {
        //     model.movies = response.data.Search;
        // }

        function selectedMovie(id) {
            $location.url("/movie/"+id);
        }
    }

})();