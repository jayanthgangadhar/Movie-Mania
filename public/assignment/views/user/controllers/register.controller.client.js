(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;


        model.register = register;

        function register(username, password, password2) {
            if(typeof username === 'undefined')
            {
                model.error = "Please enter the username";
                return;
            }

            if(password !== password2 || typeof password === 'undefined'){
                model.error = "passwords do not match";
                return;
            }
            var found = userService.findUserByUsername(username);
            if (found!== null){
                model.error = "Sorry, that username is taken!";
            }else{
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/'+ newUser._id);
            }

        }




    }
})();