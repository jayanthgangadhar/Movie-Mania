(function () {
    angular
        .module("WAM")
        .controller('flickrImageSearchController',flickrImageSearchController);

    function flickrImageSearchController($location,$routeParams,flickrService,widgetService) {

        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.widgetId = $routeParams.widgetId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.websiteId = $routeParams.websiteId;

        function searchPhotos(searchText) {

            // console.log(searchText);
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                    });

        }

        function selectPhoto(photo) {
            var url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";
            photo.widgetType = "IMAGE";
            photo.url = url;
            photo.width = "100%";
            widgetService
                .updateWidget(model.widgetId,photo)
                .then(function () {
                    $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");

                })


        }
        
    }



})();

