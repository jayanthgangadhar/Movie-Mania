var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var pageModel = require("../page/page.model.server");

var widgetModel = mongoose.model("widgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
// widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget){
    return widgetModel.create(widget)
        .then(function (widget) {
            pageModel.addWidget(widget._id, pageId);
            return widget;
        })
}

function findAllWidgetsForPage(pageId){
    return widgetModel.find({_page:pageId});

}

function findWidgetById(widgetId){
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget){
    return widgetModel.update({_id:widgetId},{$set:widget})

}

function deleteWidget(widgetId, pageId){
    return widgetModel.remove({_id:widgetId})
        .then(function () {
            pageModel.deleteWidget(pageId,widgetId);
            return;

        })
}

// function reorderWidget(pageId, start, end){
//
// }