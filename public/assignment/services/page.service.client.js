(function () {
    angular
        .module("WAM")
        .service("pageService", pageService)

    function pageService($http) {
        this.findAllPagesForWebsite = findAllPagesForWebsite;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.createPage = createPage;
        this.updatePage = updatePage;

        function deletePage(pageId,websiteId) {
            var url = "/api/website/"+websiteId+"/page/"+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;

                })
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                })
        }

        function findPageById(pageId){
            var url = "/api/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;

                })
        }

        function createPage(page) {
            var websiteId = page.websiteId;
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url,page)
                .then(function (response) {
                    return response.data;

                })
        }

        function updatePage(pageId, page) {
            var url = "/api/page/"+pageId;
            return $http.put(url ,page)
                .then(function (response) {
                    return response.data;

                })


        }





    }
})();