(function () {
    angular
        .module("WAM")
        .service("widgetService", widgetService)

    function widgetService() {
        this.findWidgetByPageId = findWidgetByPageId;
        this.findWebsiteById = findWidgetById;
        this.deleteWebsite = deleteWidget;
        this.createWidget = createWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);

            var index = websites.indexOf(website);
            widgets.splice(index,1);

        }

        function findWidgetByPageId(pageId) {
            var result = [];
            for (var w in widgets){
                if(widgets[w].pageId === pageId){
                    result.push(widgets[w]);
                }
            }return result;

        }

        function findWidgetById(widgetId){
            return widget = widgets.find(function (widget) {
                return widget._id === widgetId;

            })
        }

        function createWidget(pageId, widget) {

            // website._id = (new Date()).getTime() + "";
            widgets.push(widget);

        }





    }
})();