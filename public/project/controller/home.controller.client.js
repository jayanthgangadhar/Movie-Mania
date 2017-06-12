(function () {
    angular
        .module("project")
        .controller("homeController", homeController);

    function homeController($scope) {
        var model = this;
        // console.log('hello world');
        // $scope.searchPhotos = searchPhotos;

        model.search = search;

        //
        //
        function search(text) {
            console.log(text);
        }
    }

})();