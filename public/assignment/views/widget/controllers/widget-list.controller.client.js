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

        // model.trust = trust;
        // model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        // model.widgetUrl = widgetUrl;

        model.getYouTubeUrl= getYouTubeUrl;
        model.getTrustedHtml= getTrustedHtml;
        model.widgetTemplateUrl= widgetTemplateUrl;

        model.widgets = widgetService.findWidgetByPageId(model.pageId);

        function init() {
            console.log(model.widgets);

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