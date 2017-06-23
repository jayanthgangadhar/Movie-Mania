(function () {
    angular
        .module("project")
        .service("homeService", homeService);

    function homeService($http) {
        var model = this;
        model.findMovieByTitle = findMovieByTitle;
        model.findMovieById = findMovieById;


        function findMovieByTitle(text) {
            var url = "/api/movie/"+text;
            return $http.get(url)
                .then(function (response) {
                    return response.data.Search;

                })
        }

        function findMovieById(id) {
            var url = "/api/movie/demo/"+id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;

                })
        }
    }

})();