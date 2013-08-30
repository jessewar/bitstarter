var express = require('express');
var cons = require('consolidate');

function start(app) {
  app.engine('html', cons.swig);  // tell express to use swig as the html templating engine

  app.use(express.bodyParser());
  app.set('views', __dirname + '/views');  // tell express to look in the views directory when asked to render a page
  app.use(express.static(__dirname + '/public'));  // load anything in the /public directory as static content on the server

  var port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log("Listening on " + port);
  });
}

exports.start = start;
