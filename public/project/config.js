(function () {
    angular
        .module("project")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'hello.html',
                controller:'homeController',
                controllerAs:'model'
            });

    }

})();
