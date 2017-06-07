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
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;

                })
            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                })


        }init();

        function deletePage() {
            pageService
                .deletePage(model.pageId)
                .then(function () {
                    $location.url('/user/' +model.userId+'/website/' + model.websiteId +'/page');

                })


        }

        function updatePage(page){
            pageService
                .updatePage(model.pageId, page)
                .then(function () {
                    $location.url('/user/' +model.userId+'/website/' + model.websiteId +'/page');
                })

        }




    }

})();