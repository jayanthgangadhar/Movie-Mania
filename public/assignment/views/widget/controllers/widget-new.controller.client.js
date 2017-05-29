(function () {
    angular
        .module("WAM")
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,widgetService,$location) {

        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.addHeaderWidget = addHeaderWidget;
        model.addImageWidget = addImageWidget;
        model.addYoutubeWidget = addYoutubeWidget;


        function addYoutubeWidget() {
            var newYoutubeVideo = {"widgetType":"YOUTUBE","width":"100%","url":"https://youtu.be/Pi1yleef7bM"} ;
            var newYoutube = widgetService.createWidget(model.pageId, newYoutubeVideo);
            $location.url("/user/"+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newYoutube._id);

        }


        function addImageWidget() {
            var newImage = {"widgetType":"IMAGE","width":"100%","url":"http://upload.wikimedia.org/wikipedia/commons/d/d5/Pic_de_neige_cordier_Face_E.jpg"} ;
            var newImg = widgetService.createWidget(model.pageId, newImage);
            $location.url("/user/"+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newImg._id);

        }


        function addHeaderWidget() {
            var newHeader = {"widgetType":"HEADING","size":"3","text":"Random"} ;
            var newHead = widgetService.createWidget(model.pageId, newHeader);
            $location.url("/user/"+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" );

        }

    }

})();