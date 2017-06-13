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
            var newYoutubeVideo = {"widgetType": "YOUTUBE"};
            widgetService
                .createWidget(model.pageId, newYoutubeVideo)
                .then(function (widget) {
                    $location.url("/user/"+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                })
        }


        function addImageWidget() {
            var newImage = {"widgetType": "IMAGE"};
            widgetService
                .createWidget(model.pageId, newImage)
                .then(function (widget) {
                    $location.url("/user/"+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                })
        }


        function addHeaderWidget() {
            var widget = {"widgetType": "HEADING"};
            widgetService
                .createWidget(model.pageId, widget)
                .then(function (widget) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                })
        }

    }

})();