(function () {
    angular
        .module("WAM")
        .service("widgetService", widgetService);

    function widgetService() {
        this.findWidgetByPageId = findWidgetByPageId;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;

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

            var index = widgets.indexOf(widget);
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

        function updateWidget(widgetId, widget) {
            for (var w in widgets){
                if(widgets[w]._id === widgetId){
                    switch(widget.widgetType){
                        case "HEADER":
                            widgets[w].size = widget.size;
                            widgets[w].text = widget.text;
                            return widgets[w];
                        case "IMAGE":
                            widgets[w].url = widget.url;
                            widgets[w].width = widget.width;
                            return widgets[w];
                        case "YOUTUBE":
                            widgets[w].url = widget.url;
                            widgets[w].width = widget.width;
                            return widgets[w];
                        default:
                            return null;
                    }
                }
            }return null;

        }

        function createWidget(pageId, widget) {

            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;

        }





    }
})();