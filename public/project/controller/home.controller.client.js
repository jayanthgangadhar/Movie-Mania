(function () {
    angular
        .module("project")
        .controller("homeController", homeController);

    function homeController($http) {
        var model = this;
        // console.log('hello world');
        // $scope.searchPhotos = searchPhotos;

        model.search = search;

        //
        //
        function search(text) {
            var url = "http://www.omdbapi.com/?apikey=fc9b6f7b&s="+text;
            $http.get(url)
                .then(renderMovies)
        }
        
        function renderMovies(response) {
            model.movies = response.data.Search;
        }
    }

})();