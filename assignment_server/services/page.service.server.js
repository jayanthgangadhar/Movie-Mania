var app = require("../../express");


app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
app.get("/api/page/:pageId",findPageById);
app.post("/api/website/:websiteId/page",createPage);
app.put("/api/page/:pageId",updatePage);
app.delete("/api/website/:websiteId/page/:pageId",deletePage);

var pageModel = require('../models/page/page.model.server');

function deletePage(req,res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    pageModel
        .deletePage(pageId,websiteId)
        .then(function () {
            res.sendStatus(200);

        })
}

function updatePage(req,res) {
    var page = req.body;
    var pageId = req.params.pageId;
    pageModel
        .updatePage(pageId,page)
        .then(function (page) {
            res.json(page);

        })
    // for (var p in pages){
    //     if (pages[p]._id === pageId){
    //         pages[p].name = page.name;
    //         pages[p].description = page.description;
    //         res.json(pages[p]);
    //     }
    // }

}
function createPage(req,res) {
    var page = req.body;
    websiteId = req.params.websiteId;
    page._website =websiteId;
    pageModel
        .createPage(websiteId,page)
        .then(function (page) {
            res.json(page);
        });

    // pages.push(page);
    // res.sendStatus(200);

}
function findPageById(req,res) {
    var pageId = req.params.pageId;
    pageModel.findPageById(pageId)
        .then(function (page) {
            res.json(page);


        })
    // for (var p in pages){
    //     if(pages[p]._id === pageId){
    //         res.json(pages[p]);
    //     }
    // }
}


function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId;
    // console.log(websiteId);
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            // console.log(pages);
            res.json(pages);

        })
    // var result = [];
    // for (var p in pages){
    //     if(pages[p].websiteId === websiteId ){
    //         result.push(pages[p]);
    //     }
    // }
    // res.json(result);
}