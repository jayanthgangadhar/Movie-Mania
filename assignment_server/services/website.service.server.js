var app = require('../../express');
app.get("/api/assignment/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.post("/api/user/:userId/website",createWebsite);
app.put("/api/website/:websiteId",updateWebsite);
app.delete("/api/user/:userId/website/:websiteId",deleteWebsite);
var websiteModel = require('../models/website/website.model.server');

function deleteWebsite(req,res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsite(websiteId,userId)
        .then(function (response) {
            res.sendStatus(200);

        })
    // for(var w in websites){
    //     if(websites[w]._id === websiteId){
    //         websites.splice(w,1);
    //         res.sendStatus(200);
    //     }
    // }
}

function updateWebsite(req,res) {
    var website = req.body;
    var websiteId = req.params.websiteId;
    websiteModel
        .updateWebsite(websiteId,website)
        .then(function (website) {
            res.json(website);
        });
    // for(var w in websites){
    //     if(websites[w]._id === website._id){
    //         websites[w].name = website.name;
    //         websites[w].description = website.description;
    //         res.json(websites[w]);
    //     }
    // }
}

function findWebsiteById(req,res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);

        })
}

function findAllWebsitesForUser(req,res) {
    var userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);

        })
}

function createWebsite(req,res) {
    var website = req.body;
    var userId = req.params.userId;
    website._user=userId;
    websiteModel
        .createWebsiteForUser(userId,website)
        .then(function (website) {
            res.json(website);
        });
}



