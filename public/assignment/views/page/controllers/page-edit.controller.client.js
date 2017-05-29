(function () {
    angular
        .module("WAM")
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.pageId= $routeParams.pageId;
        model.userId= $routeParams.userId;
        model.deletePage  = deletePage;
        model.updatePage = updatePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);


        }init();

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url('/user/' +model.userId+'/website/' + model.websiteId +'/page');

        }

        function updatePage(page){
            var newPage= pageService.updatePage(model.pageId, page);
            $location.url('/user/' +model.userId+'/website/' + model.websiteId +'/page');
        }




    }

})();