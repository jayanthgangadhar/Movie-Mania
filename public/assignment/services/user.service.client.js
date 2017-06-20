(function () {
    angular
        .module("WAM")
        .factory('userService', userService);
    function userService($http) {
        // var users =[
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        // ];

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
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;

                    
                });

            // user._id = (new Date()).getTime() + "";
            // user.creted = new Date();
            // users.push(user);
            // return user;

        }
        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
            // for(u in users){
            //     if(users[u]._id === userId) {
            //         return users[u];
            //     }
            // }return null;

        }

        function findUserByCredentials (username , password) {
            var url = "/api/assignment/user?username="+username+"&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                 })
            // for (var u in users)
            // {
            //     var user = users[u];
            //     if(user.username === username && user.password === password)
            //     {
            //         return user;
            //         break;
            //     }
            // }
            // return null;
        }

        function findUserByUsername(username) {
            // var user = users.find(function (user) {
            //     return user.username === username;
            // });
            // if (typeof user === 'undefined'){
            //     return null;
            // }
            // return user;
            var url = "/api/assignment/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


        }

    }

})();