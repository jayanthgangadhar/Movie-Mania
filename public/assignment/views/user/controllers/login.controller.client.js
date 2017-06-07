(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController)

    function loginController($location, userService) {

        var model = this;


        model.login = login;

        function login(username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    // console.log(found);
                    if (found!== null){
                                $location.url('/user/' + found._id);
                            }else{
                                model.message = "Sorry, " + username + " not found.Please try again!"
                            }
                })
                .then(function () {
                    model.message = "Sorry, " + username + " not found.Please try again!"

                })

            // function renderUser(user) {
            //     var found = user;
            //     if (found!== null){
            //         $location.url('/user/' + found._id);
            //     }else{
            //         model.message = "Sorry, " + username + " not found.Please try again!"
            //     }
            // }



        }




    }
})();