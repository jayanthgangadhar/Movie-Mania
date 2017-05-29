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
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);

        }init();

        function deleteWebsite() {

            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/' +model.userId+'/website');

        }

        function updateWebsite(website) {

            var website = websiteService.updateWebsite(model.websiteId, website);
            $location.url('/user/' +model.userId+'/website');

        }




    }
    
})();