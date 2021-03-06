// need to require dbmanager.js

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
//  dbmanager.init();
//  var docs = dbmanager.getDb.collection('farm').find();
//  $('#test2').text(JSON.stringify(docs));
}
