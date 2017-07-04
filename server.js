var express = require('express');
var app = express();
var path = require('path');


// viewed at http://localhost:3000
app.get('', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/data", express.static(__dirname + '/data'));
app.use("/modules", express.static(__dirname + '/modules'));
app.use("/scripts", express.static(__dirname + '/scripts/'));
app.use("/filters", express.static(__dirname + '/filters'));
app.use("/css", express.static(__dirname + '/css/'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/fonts/roboto", express.static(__dirname + '/fonts/roboto/'));


app.listen(3000);
