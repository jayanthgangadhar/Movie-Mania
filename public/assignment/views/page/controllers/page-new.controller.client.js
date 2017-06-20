(function () {
    angular
        .module("WAM")
        .controller('pageNewController', pageNewController)

    function pageNewController($location, $routeParams, pageService, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.createPage  = createPage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;

                })
        }init();

        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService
                .createPage(page)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page');
                })
        }
    }

})();