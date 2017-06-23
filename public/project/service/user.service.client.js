(function () {
    angular
        .module("project")
        .service("userService",userService);

    function userService($http) {
        function login(username,password){
            var url = "/api/assignment/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url,credentials)
                .then(function (response) {
                    return response.data;

                })
        }

    }

})();