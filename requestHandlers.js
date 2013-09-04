var dbmanager = require(__dirname + '/dbmanager.js');

function setHandlers(app) {
  // load home page
  app.get('/', function(request, response) {
    response.render('index.html');
  });

  // load content page
  app.get('/content', function(request, response) {
      // Find one document in our collection
      dbmanager.getDb().collection('farm').findOne({}, function(err, doc) {
	  if(err) throw err;
	  response.render('content-page.html', doc);
      });
  });

  // load forms page
  app.get('/forms', function(request, response) {
    response.render('forms.html');
    console.log("form page request made");
  });

  // handles forms page input post data
  app.post('/content', function(request, response) {
    console.log(request.body);
    var db = dbmanager.getDb();
    db.collection('farm').insert(request.body, function(err, data) {
      if(err) throw err;
      console.log("successfully inserted: " + JSON.stringify(data));
      response.end(); // needed to tell client that the POST was successful
    });
  });

  // handles password post data
  app.post('/forms', function(request, response) {
    console.log(request.body);
    var password = request.body.password;
    console.log(password);

    response.send(request.body);
    response.end();
  });
}

exports.setHandlers = setHandlers;
