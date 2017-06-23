(function () {
    angular
        .module("project")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'views/home.html',
                controller:'homeController',
                controllerAs:'model'
            })
            .when('/movie/:movieId',{
                templateUrl:'./views/movie/templates/movie.view.client.html',
                controller:'movieController',
                controllerAs:'model'
            })
            .when('/user/login',{
                templateUrl:'./views/user/templates/login.view.client.html',
                controller:'loginController',
                controllerAs:'model'
            })
            .when('/user/register',{
                templateUrl:'./views/user/templates/register.view.client.html',
                controller:'registerController',
                controllerAs:'model'
            })
            .when('/user/profile',{
                templateUrl:'./views/user/templates/profile.view.client.html',
                controller:'profileController',
                controllerAs:'model'
            })
            .when('/user/message',{
                templateUrl:'./views/user/templates/message.view.client.html',
                controller:'messageController',
                controllerAs:'model'
            })


    }

})();
