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
        model.createHtmlWidget=createHtmlWidget;
        model.createTextWidget=createTextWidget;


        function addYoutubeWidget() {
            var newYoutubeVideo = {"widgetType": "YOUTUBE"};
            widgetService
                .createWidget(model.pageId, newYoutubeVideo)
                .then(function (widget) {
                    $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                })
        }


        function addImageWidget() {
            var newImage = {"widgetType": "IMAGE"};
            widgetService
                .createWidget(model.pageId, newImage)
                .then(function (widget) {
                    $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                })
        }


        function addHeaderWidget() {
            var widget = {"widgetType": "HEADING"};
            widgetService
                .createWidget(model.pageId, widget)
                .then(function (widget) {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                })
        }

        function createHtmlWidget(widget){
            widgetService.createWidgetHtml(model.pageId,widget)
                .then(function (widget) {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                });
        }

        function createTextWidget(widget) {
            widgetService.createWidgetText(model.pageId, widget)
                .then(function (widget) {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }

    }

})();