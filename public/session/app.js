var app = require("../../express");

app.get("/api/session",function (req,res) {
    console.log(req.session);
    res.send(req.session);
    
});