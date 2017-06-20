(function () {
    angular
        .module("WAM")
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,widgetService,$location) {

        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })

        }init();

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId,model.pageId)
                .then(function () {
                    $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
                })
        }

        function updateWidget(widget) {
            widgetService
                .updateWidget(model.widgetId, widget, model.pageId)
                .then(function() {
                    $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
                })


        }

    }

})();