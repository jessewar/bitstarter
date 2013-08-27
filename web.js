var express = require('express');
var fs = require('fs');
var app = express();
var cons = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var mongoclient = new MongoClient(new Server("ip-10-243-46-189", 28017));
var db = mongoclient.db('bitstarter');

app.engine('html', cons.swig);  // tell express to use swig as the html templating engine
app.set('views', __dirname);  // tell express to treat files in main directory as views

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
    // Find one document in our collection
    db.collection('farm').findOne({'name':'MyFarm2'}, function(err, doc) {
	if(err) throw err;

	response.render('content-page.html', doc);
    });
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);

  // connect to MongoDB server on my EC2 instance
  mongoclient.open(function(err, mongoclient) {
    if(err) throw err;

    console.log('Listening to DB');
  });
});
