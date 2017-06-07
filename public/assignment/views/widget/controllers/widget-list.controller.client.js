(function () {
    angular
        .module("WAM")
        .controller('widgetListController', widgetListController);
    
    function widgetListController($sce,$routeParams,widgetService) {

        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.getYouTubeUrl= getYouTubeUrl;
        model.getTrustedHtml= getTrustedHtml;
        model.widgetTemplateUrl= widgetTemplateUrl;

        // model.widgets = widgetService.findWidgetByPageId(model.pageId);

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                    model.widgets.sort(function (a,b) {return (a.index > b.index)?1:((b.index>a.index)?-1:0);});

                    })
        }init();


        function getTrustedHtml(text) {
            return $sce.trustAsHtml(text);

        }

        function widgetTemplateUrl(widget) {
            var Url = 'views/widget/templates/widget-' +widget+'.view.client.html';
            return Url;
        }

        function getYouTubeUrl(yurl) {
            var urlParts = yurl.split("/");
            var id= urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }


    }

})();