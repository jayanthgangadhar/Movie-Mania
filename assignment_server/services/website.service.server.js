var app = require('../../express');
app.get("/api/assignment/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.post("/api/user/:userId/website",createWebsite);
app.put("/api/website/:websiteId",updateWebsite);
app.delete("/api/website/:websiteId",deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function deleteWebsite(req,res) {
    var websiteId = req.params.websiteId;
    for(var w in websites){
        if(websites[w]._id === websiteId){
            websites.splice(w,1);
            res.sendStatus(200);
        }
    }
}

function updateWebsite(req,res) {
    var website = req.body;
    for(var w in websites){
        if(websites[w]._id === website._id){
            websites[w].name = website.name;
            websites[w].description = website.description;
            res.json(websites[w]);
        }
    }
}

function findWebsiteById(req,res) {
    var websiteId = req.params.websiteId;
    for(var w in websites){
        var website = websites[w];
        if(website._id === websiteId){
            res.json(website);
        }
    }
}

function findAllWebsitesForUser(req,res) {
    var result = [];
    for (var w in websites){
        if(websites[w].developerId === req.params.userId){
            result.push(websites[w]);
        }
    }res.json(result);

}

function createWebsite(req,res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
}



