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
            .when('/user/movie/:movieId',{
                templateUrl:'./views/movie/templates/movie.view.client.html',
                controller:'movieController',
                controllerAs:'model',
                resolve:{
                    currentUser: checkCurrentUser
                }
            })
            .when('/user/profile',{
                templateUrl:'./views/user/templates/profile.view.client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/profile/:id',{
                templateUrl:'./views/user/templates/profile.view.client.html',
                controller:'profileViewController',
                controllerAs:'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/followers',{
                templateUrl:'./views/user/templates/followers.view.client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/following',{
                templateUrl:'./views/user/templates/following.view.client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/reviews',{
                templateUrl:'./views/review/templates/review.view.client.html',
                controller:'reviewController',
                controllerAs:'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/search',{
                templateUrl:'./views/user/templates/userSearch.view.client.html',
                controller:'homeController',
                controllerAs:'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })


    }
    function checkLoggedIn(userService, $location, $q) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if (user === '0'){
                    deferred.reject();
                    $location.url('/');
                    alert("Please login to continue")
                }else{
                    deferred.resolve(user);
                }


            });
        return deferred.promise;
    }

    function checkCurrentUser(userService, $location, $q) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if (user === '0'){
                    deferred.resolve({});
                }else{
                    deferred.resolve(user);
                }


            });
        return deferred.promise;
    }

})();
