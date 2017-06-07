(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;


        model.register = register;

        function register(username, password, password2) {
            if (typeof username === 'undefined') {
                model.error = "Please enter the username";
                return;
            }

            if (password !== password2 || typeof password === 'undefined') {
                model.error = "passwords do not match";
                return;
            }
            userService.findUserByUsername(username)
                .then(
                    function () {
                        model.error = "Sorry, that username is taken!";
                    },
                    function () {

                        var newUser = {
                            username: username,
                            password: password
                        };

                        return userService
                            .createUser(newUser);
                    }
                    )
                .then(function (user) {
                    $location.url('/user/' + user._id);
                });


        }
    }})();
