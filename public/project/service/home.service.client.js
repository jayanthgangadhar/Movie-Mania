(function () {
    angular
        .module("project")
        .service("homeService", homeService);

    function homeService($http) {
        var model = this;
        model.findMovieByTitle = findMovieByTitle;
        model.findMovieById = findMovieById;
        model.findTrailerByMovieid = findTrailerByMovieid;
        model.findCastByMovieId = findCastByMovieId;
        model.findSimilarMovie = findSimilarMovie;

        function findSimilarMovie(id) {
            var url = "/api/movie/"+id+"/similar";
            return $http.get(url)
                .then(function (response) {
                    return response.data.results;
                })

        }


        function findMovieByTitle(text) {
            var url = "/api/movie/"+text;
            return $http.get(url)
                .then(function (response) {
                    return response.data.results;

                })
        }

        function findMovieById(id) {
            var url = "/api/movie/demo/"+id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;

                })
        }

        function findTrailerByMovieid(id) {
            var url = "/api/movie/"+id+"/trailer";
            return $http.get(url)
                .then(function (response) {
                    return response.data.results;
                })
        }

        function findCastByMovieId(id) {
            var url = "/api/movie/"+id+"/cast";
            return $http.get(url)
                .then(function (response) {
                    return response.data.cast;
                })

        }
    }

})();