(function () {
    angular
        .module("WAM")
        .controller('pageListController',pageListController);

    function pageListController($routeParams, pageService) {

        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;


        model.pages = pageService.findPageByWebsiteId(model.websiteId);

    }

})();
