(function () {
    angular
        .module("WAM")
        .service("websiteService", websiteService)

    function websiteService() {
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        function deleteWebsite(websiteId) {
            var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index,1);

        }

        function findAllWebsitesForUser(userId) {
            var result = [];
            for (var w in websites){
                if(websites[w].developerId === userId){
                    websites[w].created = new Date();
                    websites[w].accessed = new Date();
                    result.push(websites[w]);
                }
            }return result;

        }

        function findWebsiteById(websiteId){
            return website = websites.find(function (website) {
                return website._id === websiteId;

            })
        }

        function createWebsite(website) {

            website._id = (new Date()).getTime() + "";
            websites.push(website);

        }





    }
})();