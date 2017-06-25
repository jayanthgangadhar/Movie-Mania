(function () {
    angular
        .module("project")
        .controller("profileController",profileController);

    function profileController($location ,userService,currentUser, MessageService) {
        var model =this;
        model.userID = currentUser._id;
        model.updateUser = updateUser;
        model.logout = logout;
        model.user = currentUser;


        function init() {
            // console.log(currentUser);
            model.user = currentUser;
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/")
                })

        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user )
                .then(function () {
                    model.message = "User Updated"
                },function () {
                    model.error = "User cannot be Unregistered"
                })
        }


    }

})();