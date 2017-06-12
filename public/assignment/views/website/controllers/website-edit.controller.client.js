(function () {
    angular
        .module("WAM")
        .controller('websiteEditController', websiteEditController)
    
    function websiteEditController($location, $routeParams, websiteService) {

        var model = this;
        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.deleteWebsite  = deleteWebsite;
        model.updateWebsite  = updateWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;

                }),
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;

                })

        }init();

        function deleteWebsite() {

            websiteService
                .deleteWebsite(model.websiteId,model.userId)
                .then(function () {
                    $location.url('/user/' +model.userId+'/website');
                })
        }

        function updateWebsite(websiteId, website) {
            websiteService
                .updateWebsite(model.websiteId, model.website)
                .then(function () {
                    $location.url('/user/' +model.userId+'/website');
                })


        }




    }
    
})();