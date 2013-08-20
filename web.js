var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());

var buffer = fs.readFileSync("index.html");
var str = buffer.toString();

var contentBuffer = fs.readFileSync("content-page.html");
var contentStr = contentBuffer.toString();

app.configure(function(){app.use(express.static(__dirname + '/public'));});

app.get('/', function(request, response) {
  response.send(str);
});

app.get('/content', function(request, response) {
    response.send(contentStr);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
