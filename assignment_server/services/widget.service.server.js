const app = require("../../express");
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
    var widgetModel = require("../models/widget/widget.model.server");
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.put("/api/page/:pageId/widget/:widgetId",updateWidget);
    app.delete("/api/page/:pageId/widget/:widgetId",deleteWidget);
    app.put("/page/:pageId/widget",updateIndex);

function deleteWidget(req,res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;
    widgetModel
        .deleteWidget(widgetId,pageId)
        .then(function () {
            res.sendStatus(200);
            
        })
    // for (var w in widgets){
    //     if (widgets[w]._id === widgetId){
    //         widgets.splice(w,1);
    //         res.sendStatus(200);
    //     }
    // }

}

function updateWidget(req,res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    var widgetType = widget.widgetType;
    var pageId = req.params.pageId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (found) {
            switch(found.widgetType){
                case "HEADING":
                    found.size = widget.size;
                    found.text = widget.text;
                    widgetModel
                        .updateWidget(widgetId,found)
                        .then(function (widget) {
                            // console.log(widget);
                            res.json(widget);
                        },
                        function (error) {
                            console.log('error: ' + error);
                        });
                    break;
                case "IMAGE":
                    found.url = widget.url;
                    found.width = widget.width;
                    found.name = widget.name;
                    found.text= widget.text;
                    widgetModel
                        .updateWidget(widgetId,found)
                        .then(function (widget) {
                            res.json(widget);

                        });
                    break;
                case "YOUTUBE":
                    found.url = widget.url;
                    found.width = widget.width;
                    found.name = widget.name;
                    found.text= widget.text;
                    // console.log(found);
                    widgetModel
                        .updateWidget(widgetId ,found)
                        .then(function (widget) {
                            res.json(widget);

                        });
                    break;
                case "TEXT":
                    found.text = widget.text;
                    found.rows = widget.rows;
                    found.placeholder = widget.placeholder;
                    found.formatted = widget.formatted;
                    widgetModel
                        .updateWidget(widgetId,found)
                        .then(function (widget) {
                            res.json(widget);

                        });
                    break;
                case "HTML":
                    found.text = widget.text;
                    widgetModel
                        .updateWidget(widgetId,found)
                        .then(function (widget) {
                            res.json(widget);

                        });
                    break;
                default:
                    res.sendStatus(400);
                    break;
            }

        })



    // }

}

function findAllWidgetsForPage(req,res) {
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);

        })
}

function createWidget(req,res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widget._page = pageId;
    widgetModel
        .createWidget(pageId,widget)
        .then(function (widget) {
            res.json(widget);

        })

}


    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            })
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

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = '/assignment/uploads/'+filename;
                widgetModel.updateWidget(widgetId,widget)
                    .then(function () {

                        var callbackUrl= "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
                        res.redirect(callbackUrl);

                    });

            });
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
