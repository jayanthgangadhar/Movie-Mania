/**
 * Created by Jayanth on 13-05-2017.
 */
var express = require('express');
var app = express();


// app.get('/hello', function (req, res) {
//     res.send({message : 'hello from server'});
//
// })
app.use(express.static(__dirname + '/public'));

app.listen(5000);