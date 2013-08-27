var express = require('express');
var fs = require('fs');
var app = express();
var cons = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;


var textUri = "mongodb://heroku_app17145481:iq6hv1i7kuknq833rcoome4q57@ds041198.mongolab.com:41198/heroku_app17145481";
// var uri = new MongoClientURI(textUri);
// var mongoclient = new MongoClient(uri);

var server = new Server("10.226.119.215", 41198);
var db = new Db('heroku_app17145481', server);

//var mongoclient = new MongoClient(new Server("10.226.119.215", 41198), {auto_reconnect: true});
// var db = mongoclient.db('bitstarter');


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
    db.collection('farm').findOne({}, function(err, doc) {
	if(err) throw err;

	response.render('content-page.html', doc);
    });
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);

  // connect to MongoDB server on my EC2 instance
  db.open(function(err, client) {
    if(err) throw err;

    client.authenticate("jessewar", "lemonlime1", function(err, success) {

    });

    console.log('Listening to DB');
  });
});
