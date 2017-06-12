(function () {
    angular
        .module("WAM")
        .controller('websiteNewController', websiteNewController)

    function websiteNewController($location, $routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams.userId;
        model.createWebsite  = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }init();

        function createWebsite(website) {
                websiteService
                    .createWebsite(model.userId,website)
                    .then(function () {
                        $location.url('/user/' + model.userId + '/website');
                    })

            }







    }

})();