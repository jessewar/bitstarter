var dbmanager = require(__dirname + '/dbmanager.js');

function setHandlers(app) {
  // load home page
  app.get('/', function(request, response) {
    response.render('index.html');
  });

  // load content page
  app.get('/content', function(request, response) {
      // Find one document in our collection
      dbmanager.getDb().collection('farm').findOne({'name': 'AnotherFarm'}, function(err, doc) {
	  if(err) throw err;
	  response.render('content-page.html', doc);
      });
  });

  // load forms page
  app.get('/forms', function(request, response) {
    response.render('forms.html');
    console.log("form page request made");
  });

  // handles forms post data
  app.post('/forms', function(request, response) {
    console.log("made it to post area");
    console.log(request.body);
    response.send(request.body);
  });
}

exports.setHandlers = setHandlers;
