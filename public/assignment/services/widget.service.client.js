(function () {
    angular
        .module("WAM")
        .service("widgetService", widgetService);

    function widgetService($http) {
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;

                })

        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;

                })
        }

        function findWidgetById(widgetId){
            var url = '/api/widget/' + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

            // return widget = widgets.find(function (widget) {
            //     return widget._id === widgetId;
            //
            // })
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWidget(pageId, widget) {
            var url= '/api/page/'+pageId+'/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }



    }
})();