var express = require('express'),
    fs = require('fs'),
    app = express(),
    cons = require('consolidate');


var buffer = fs.readFileSync("index.html");
var str = buffer.toString();

var contentBuffer = fs.readFileSync("content-page.html");
var contentStr = contentBuffer.toString();

// load anything in the /public directory as static content on the server
app.use(express.static(__dirname + '/public'));

// load home page
app.get('/', function(request, response) {
  response.send(str);
});

// load content page
app.get('/content', function(request, response) {
    response.send(contentStr);

    
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
