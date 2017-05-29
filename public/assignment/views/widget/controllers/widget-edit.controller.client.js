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
            model.widget = widgetService.findWidgetById(model.widgetId);

        }init();

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("/user/" +model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");

        }

        function updateWidget() {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url("/user/" +model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");

        }

    }

})();