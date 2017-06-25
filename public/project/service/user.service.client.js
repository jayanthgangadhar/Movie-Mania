(function () {
    angular
        .module("project")
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById ,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login:login,
            logout:logout,
            loggedin:loggedin,
            register:register
        };

        return api;

        function register(user) {
            var url ="/api/assignment/register";
            console.log(user);
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                })
        }

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function loggedin() {
            var url = "/api/assignment/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

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



        function deleteUser(userId) {
            var url = '/api/assignment/user/'+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function updateUser(userId, user) {
            var url = "/api/assignment/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }
        function createUser(user) {
            console.log(user);
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            console.log("HELLO:"+userId);
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findUserByCredentials (username , password) {
            var url = "/api/assignment/user?username="+username+"&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


        }

    }

})();