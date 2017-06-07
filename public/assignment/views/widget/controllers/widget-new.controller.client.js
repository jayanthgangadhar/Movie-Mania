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
            var newYoutubeVideo = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "size": "", "text": "", "name": ""};
            widgetService
                .createWidget(model.pageId, newYoutubeVideo)
                .then(function (widget) {
                    $location.url("/user/"+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                })
        }


        function addImageWidget() {
            var newImage = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "100%", "text": "", "name": ""};
            widgetService
                .createWidget(model.pageId, newImage)
                .then(function (widget) {
                    $location.url("/user/"+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                })
        }


        function addHeaderWidget() {
            var widget = { "_id": "", "widgetType": "HEADING", "pageId": "", "size": "", "text": "", "name": ""};
            widgetService
                .createWidget(model.pageId, widget)
                .then(function (widget) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                })
        }

    }

})();