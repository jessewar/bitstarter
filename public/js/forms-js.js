$(document).ready(function() {
  promptForPassword();  

  submitClicked();
});

function promptForPassword() {
  
}

function submitClicked() {
  $('.btn').on('click', function() {
    var farmName = getFarmName();
    var farmTypes = getFarmTypes();

    var doc = {'farmName': farmName,
	       'farmTypes': farmTypes}
    $.ajax({
	'url': '/forms',
	'type': 'POST',
	'dataType': 'json',
	'data': doc,
	'success': function (data, textStatus, jqXRH) {
	    alert("Your page was successfully revised");
	},
	'error': function (data) {
	  alert("There was an error!");
	}
    });

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

// function putIntoDb(farmName, farmTypes) {
//   var docs = dbmanager.getDb().collection('farm').find();
//   $('#test3').text(JSON.stringify(docs));
// }
