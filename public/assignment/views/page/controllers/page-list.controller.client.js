(function () {
    angular
        .module("WAM")
        .controller('pageListController',pageListController);

    function pageListController($routeParams, pageService, currentUser) {

        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.userId = currentUser._id;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
            })


        }init();
    }

})();
