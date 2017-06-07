(function () {
    angular
        .module('wdDirectives', [])
        .directive('wdSortable', wdSortable);

    function wdSortable($http, $routeParams) {
        function linkFunc(scope, element, attributes) {
            pageId = $routeParams["pageId"];
            $(element).sortable({axis: 'y',
                start : function (event, ui) {
                    initialIndex = ui.item.index();

                },
                stop : function (event, ui) {
                    finalIndex = ui.item.index();
                    var newMap = {};
                    $.map($(this).find('div'), function(el) {
                        if(el.id != undefined) {
                            id = el.id;
                            index = $(el).index();
                            newMap[id] = index;
                        }
                    });
                    $http.put("/page/"+pageId+"/widget?initial=" + initialIndex + "&final="+ finalIndex, newMap);

                }});



        }
        return {
            link: linkFunc
        };
    }
})();