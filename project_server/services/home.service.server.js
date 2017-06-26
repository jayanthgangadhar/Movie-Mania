var app = require("../../express");
var http = require("http");
app.get("/api/movie/:title",findMovieByTitle);
app.get("/api/movie/demo/:movieId",findMovieById);
app.get("/api/movie/:movieId/trailer",findTrailerByMovieid);
app.get("/api/movie/:movieId/cast",findCastByMovieid);
app.get("/api/movie/:movieId/similar", findSimilarMovie);
app.get("/api/popularmovie", findPoplarMovies);

var TMDBKey = "ae05a08f330d781c8557ec8fafeea6a6";
var baseUrl = "api.themoviedb.org";
var path = "/3/OPTION?api_key=API_KEY&language=en&query=";

// https://api.themoviedb.org/3/movie/ 28/similar?api_key=ae05a08f330d781c8557ec8fafeea6a6&language=en-US&page=1

var popularMovies = "movie/popular";
var movieByTitle = "search/movie";
var similarMovies = "movie/MOVIEID/similar";
var movieCredits = "movie/MOVIEID/credits";
var movieDetails = "movie/MOVIEID";
var movieName = "&query=QUERY";
var moviePage = "&page=PAGE";
var nowPlayingMovies = "movie/now_playing?";


function findMovieByTitle(req,res) {
    var text = req.params.title;
    var options={
        host:baseUrl,
        path:path
            .replace("OPTION",movieByTitle)
            .replace("API_KEY",TMDBKey)
        +movieName.replace("QUERY",text)

    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}

function findMovieById(req,res) {
    var movieId=req.params.movieId;
    var options={
        host:baseUrl,
        path:path
            .replace("OPTION",movieDetails)
            .replace("MOVIEID",movieId)
            .replace("API_KEY",TMDBKey)

    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}

function findTrailerByMovieid(req,res) {
    var id = req.params.movieId;
    var url = "http://api.themoviedb.org/3/movie/"+id+"/videos?api_key=ae05a08f330d781c8557ec8fafeea6a6";
    http.get(url, function(response) {
        var finalData = "";

        response.on("data", function (data) {
            res.send(data);
        });

    });
}

function findCastByMovieid(req,res) {
    var movieId=req.params.movieId;
    var options={
        host:baseUrl,
        path:path
            .replace("OPTION",movieCredits)
            .replace("MOVIEID",movieId)
            .replace("API_KEY",TMDBKey)

    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}

function findPoplarMovies(req,res) {
    var options={
        host:baseUrl,
        path:path
            .replace("OPTION",popularMovies)
            .replace("API_KEY",TMDBKey)
            .replace("&query=","")
    };

    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}

function findSimilarMovie(req,res) {
    var id = req.params.movieId;
    var options={
        host:baseUrl,
        path:path
            .replace("OPTION",similarMovies)
            .replace("MOVIEID",id)
            .replace("API_KEY",TMDBKey)
            .replace("&query=","")
    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}




// https://api.themoviedb.org/3/movie/top_rated?api_key=ae05a08f330d781c8557ec8fafeea6a6&language=en-US&page=1


