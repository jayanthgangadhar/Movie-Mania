var app = require("../../express");
var http = require("http");
app.get("/api/movie/:title",findMovieByTitle);
app.get("/api/movie/demo/:movieId",findMovieById);

function findMovieByTitle(req,res) {
    var text = req.params.title;
    var url = "http://www.omdbapi.com/?apikey=fc9b6f7b&s="+text;
    // return requestify.get(url)
    //     .then(function (response) {
    //         return response;
    //
    //     })

    http.get(url, function(response) {
        var finalData = "";

        response.on("data", function (data) {
            res.send(data);
        });

    });
}
function findMovieById(req,res) {
    var id = req.params.movieId;
    var url = "http://www.omdbapi.com/?apikey=fc9b6f7b&i="+id;
    http.get(url, function(response) {
        var finalData = "";

        response.on("data", function (data) {
            res.send(data);
        });

    });
}


