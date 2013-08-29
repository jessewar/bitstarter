var express = require('express');
var fs = require('fs');
var app = express();
var cons = require('consolidate');
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;


var server = new Server("ds041198.mongolab.com", 41198); // ip address 10.226.119.215
var db = new Db('heroku_app17145481', server);

app.engine('html', cons.swig);  // tell express to use swig as the html templating engine
app.set('views', __dirname);  // tell express to treat files in main directory as views

// load anything in the /public directory as static content on the server
app.use(express.static(__dirname + '/public'));

// load home page
app.get('/', function(request, response) {
  response.render('index.html');
});

// load content page
app.get('/content', function(request, response) {

    // Find one document in our collection
    db.collection('farm').findOne({'name': 'AnotherFarm'}, function(err, doc) {
	if(err) throw err;

	response.render('content-page.html', doc);
    });
});

// load forms page
app.get('/forms', function(request, response) {
  response.render('forms.html');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);

  db.open(function(err, client) {
    if(err) throw err;

    client.authenticate("jessewar", "lemonlime1", function(err, success) {
      // fill with something later	
    });

    console.log('Listening to DB');
  });
});
