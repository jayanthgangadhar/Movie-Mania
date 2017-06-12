var mongoose = require('mongoose');
var websiteSchema  = require('./website.schema.server');
var websiteModel = mongoose.model("websiteModel",websiteSchema);

websiteModel.findAllWebsites = findAllWebsites;
websiteModel.createWebsiteForUser = createWebsiteForUser;

module.exports = websiteModel;

function findAllWebsites() {
    return websiteModel.find();

}

function createWebsiteForUser(userId,website) {
    website._user = userId;
    return websiteModel.create(website);
}