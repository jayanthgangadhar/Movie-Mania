(function () {
    angular
        .module("WAM")
        .service("flickrService",flickrService);
    
    function flickrService($http) {
        // console.log("sdsdsd");
        this.searchPhotos = searchPhotos;
        var key = "b27927bb63a72f32d7be94ccca1e811c";
        var secret = "41c78a13775d47a4";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }
    
})();