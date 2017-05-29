(function () {
    angular
        .module("WAM")
        .service("pageService", pageService)

    function pageService() {
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.createPage = createPage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];


        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index,1);

        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for (var p in pages){
                if(pages[p].websiteId === websiteId){
                    pages[p].created = new Date();
                    pages[p].accessed = new Date();
                    result.push(pages[p]);
                }
            }return result;

        }

        function findPageById(pageId){
            return page = pages.find(function (page) {
                return page._id === pageId;

            })
        }

        function createPage(page) {

            page._id = (new Date()).getTime() + "";
            pages.push(page);

        }





    }
})();