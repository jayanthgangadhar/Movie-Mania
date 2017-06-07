var app = require("../../express");

app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
app.get("/api/page/:pageId",findPageById);
app.post("/api/website/:websiteId/page",createPage);
app.put("/api/page/:pageId",updatePage);
app.delete("/api/page/:pageId",deletePage);



var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function deletePage(req,res) {
    var pageId = req.params.pageId;
    for(var p in pages){
        if (pages[p]._id === pageId){
            pages.splice(p,1);
            res.sendStatus(200);
        }
    }

}

function updatePage(req,res) {
    var page = req.body;
    var pageId = req.params.pageId;
    for (var p in pages){
        if (pages[p]._id === pageId){
            pages[p].name = page.name;
            pages[p].description = page.description;
            res.json(pages[p]);
        }
    }

}
function createPage(req,res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.sendStatus(200);

}
function findPageById(req,res) {
    var pageId = req.params.pageId;
    for (var p in pages){
        if(pages[p]._id === pageId){
            res.json(pages[p]);
        }
    }
}


function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId;
    var result = [];
    for (var p in pages){
        if(pages[p].websiteId === websiteId ){
            result.push(pages[p]);
        }
    }
    res.json(result);
}