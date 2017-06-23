(function () {
    angular
        .module('project')
        .controller('loginController', loginController)

    function loginController($location, userService) {

        var model = this;
        model.login = login;

        function login(username, password) {

            userService
                .login(username, password)
                .then(function (found) {
                    if (found!== null){
                        $location.url('/profile');
                    }
                    else{

                        model.message = "Sorry, " + username + " not found.Please try again!"
                    }
                },function (){
                    model.message = "Sorry, " + username + " not found.Please try again!"
                })
            // .then(function () {
            //
            //
            // })
            // model.message = "Sorry, " + username + " not found.Please try again!"



        }




    }
})();