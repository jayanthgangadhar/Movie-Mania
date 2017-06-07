const app = require("../../express");
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/page/:pageId/widget",updateIndex);


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    // { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" }
    // { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function deleteWidget(req,res) {
    var widgetId = req.params.widgetId;
    for (var w in widgets){
        if (widgets[w]._id === widgetId){
            widgets.splice(w,1);
            res.sendStatus(200);
        }
    }

}

function updateWidget(req,res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    var widgetType = widget.widgetType;
    for (var w in widgets){
        if(widgets[w]._id === widgetId){
            switch(widgetType){
                case "HEADING":
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                    res.send(widgets[w]);
                    break;

                case "IMAGE":
                    widgets[w].url = widget.url;
                    widgets[w].width = widget.width;
                    res.json(widgets[w]);
                    break;
                case "YOUTUBE":
                    widgets[w].url = widget.url;
                    widgets[w].width = widget.width;
                    res.json(widgets[w]);
                    break;
                default:
                    res.json(400);
                    break;
            }
        }
    }

}

function findAllWidgetsForPage(req,res) {
    var pageId = req.params.pageId;
    var result = [];
    for (var w in widgets){
        if(widgets[w].pageId === pageId){
            result.push(widgets[w]);
        }
    }res.json(result);

}

function createWidget(req,res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);

}


    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets){
            var widget = widgets[w];
            if (widget._id === widgetId){
                res.json(widget);
                // res.sendStatus(200);
            }
        }
        // res.sendStatus(400);



    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for (var w in widgets){
            var widget = widgets[w];
            if (widgetId===widget._id){
                var widget = widget;
            }
        }
        widget.url = '/assignment/uploads/'+filename;

        var callbackUrl= "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

        res.redirect(callbackUrl);
    }

function updateIndex(req, res) {
    var pageId = req.params.pageId;
    var newmap = req.body;
    for (var i = 0; i < widgets.length; i++) {
        if(widgets[i].pageId == pageId) {
            id = widgets[i]._id;
            widgets[i].index = newmap[id];
        }
    }
    res.sendStatus(200);
}
