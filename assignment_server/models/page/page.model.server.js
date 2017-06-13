var mongoose = require("mongoose");
var pageSchema = require('./page.schema.server');
var websiteModel = require('../website/website.model.server');
var pageModel = mongoose.model("pageModel", pageSchema);

pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

function deleteWidget(pageId,widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();

        })

}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website:websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function createPage(websiteId, page) {
    return pageModel.create(page)
        .then(function (page) {
                websiteModel.addPage(page._id, websiteId);
                return page;
            }
        )
        .catch(function (error) {
            console.log('Error: ' + error);
        });
}

function updatePage(pageId, page) {
    return pageModel.update({_id:pageId},{$set:page});

}

function deletePage(pageId,websiteId) {
    return pageModel
        .remove({_id:pageId})
        .then(function () {
            websiteModel.deletePage(pageId,websiteId);
            return;

        })

}

function addWidget(widgetId, pageId) {
    return pageModel
        .findPageById(pageId)
        .then(
            function (page) {
                page.widgets.push(widgetId);
                return page.save();

            },
            function (error) {
                console.log('error ' + error);
                return error;
            }
        );



}