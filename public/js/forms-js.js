$(document).ready(function() {
  submitClicked();
});

function submitClicked() {
  $('.btn').on('click', function() {
    var farmName = getFarmName();
    var farmTypes = getFarmTypes();

    putIntoDb(farmName, farmTypes);
  });
}

// returns the name of the farm as a string
function getFarmName() {
  var farmName = $('#farm-name-textbox').val();
  $('#test2').text(farmName);

  return farmName;
}

// returns an array containing the types of goods a farm has available
function getFarmTypes() {
  var arr = $('#checkboxes :checked'); // array of checkboxes that were checked

  var farmTypes = [];
  for (var i = 0; i < arr.length; i++) {
    farmTypes[i] = arr[i].name;
  }

  $('#test').text(farmTypes.toString());
  return farmTypes;
}

function putIntoDb(farmName, farmTypes) {
  var server = new Server("ds041198.mongolab.com", 41198); // ip address 10.226.119.215
  $('#test3').text("hello world");
  var db = new Db('heroku_app17145481', server);


  db.open(function(err, client) {
    if(err) throw err;

    client.authenticate("jessewar", "lemonlime1", function(err, success) {
      var docs = db.farm.find();
      $('#test2').text(JSON.stringify(docs));
    });
  });
}
