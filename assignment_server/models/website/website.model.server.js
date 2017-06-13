var mongoose = require('mongoose');
var websiteSchema  = require('./website.schema.server');
var websiteModel = mongoose.model("websiteModel",websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.findAllWebsites = findAllWebsites;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;



module.exports = websiteModel;

function deletePage(pageId,websiteId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index,1);
            return website.save();

        })

}

function addPage(pageId, websiteId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(
            function (website) {
                website.pages.push(websiteId);
                return website.save();

            },
            function (error) {
                console.log('error ' + error);
                return error;
            }
        );

}

function findAllWebsites() {
    return websiteModel.find();
}

function findWebsiteById(id) {
    return websiteModel.findOne({_id:id});
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user:userId})
}

function createWebsiteForUser(userId,website) {
    return websiteModel.create(website)
        .then(
            function (website) {
                userModel.addWebsite(website._id, userId);
                return website;
            }
        )
        .catch(function (error) {
            console.log('Error: ' + error);
        });
}

function updateWebsite(websiteId,website) {
    return websiteModel.update({_id:websiteId},{$set:website});

}

function deleteWebsite(websiteId,userId) {
    return websiteModel
        .remove({_id:websiteId})
        .then(function () {
            userModel.deleteWebsite(userId,websiteId);
            return;

        })

}