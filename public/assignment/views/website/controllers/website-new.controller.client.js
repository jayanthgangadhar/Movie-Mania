(function () {
    angular
        .module("WAM")
        .controller('websiteNewController', websiteNewController)

    function websiteNewController($location, $routeParams, websiteService,currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.createWebsite  = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;

                })

        }init();

        function createWebsite(website) {
                websiteService
                    .createWebsite(model.userId,website)
                    .then(function () {
                        $location.url('/website');
                    })

            }







    }

})();