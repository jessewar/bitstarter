var express = require('express');
var cons = require('consolidate');

function start(app) {
  app.engine('html', cons.swig);  // tell express to use swig as the html templating engine
  app.set('views', __dirname);  // tell express to treat files in main directory as views

  // load anything in the /public directory as static content on the server
  app.use(express.static(__dirname + '/public'));

  var port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log("Listening on " + port);
  });
}

exports.start = start;
