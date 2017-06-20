(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController)

    function profileController($location , $routeParams, userService, currentUser) {

        var model = this;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.userId = currentUser._id;
        model.logout = logout;

        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser,userError);
        
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login")
                })

        }


        function init() {
            renderUser(currentUser);
        }init();
        
        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                })
        }

        function renderUser(user) {
                model.user = user;
        }

        function userError(error) {
            model.error = "User not found!"

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