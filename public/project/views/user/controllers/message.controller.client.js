(function () {
    angular
        .module("project")
        .controller("messageController",messageController);

    function messageController() {
        var model = this;
        model.message = "messageController";

    }

})();