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

    // jQuery Ajax Error Handling Function
    $.ajaxSetup({
      error: function(jqXHR, exception) {
	if (jqXHR.status === 0) {
	  alert('Not connect.\n Verify Network.');
	} else if (jqXHR.status == 404) {
	  alert('Requested page not found. [404]');
	} else if (jqXHR.status == 500) {
	  alert('Internal Server Error [500].');
	} else if (exception === 'parsererror') {
	  alert('Requested JSON parse failed.');
	} else if (exception === 'timeout') {
	  alert('Time out error.');
	} else if (exception === 'abort') {
	  alert('Ajax request aborted.');
	} else {
	  alert('Uncaught Error.\n' + jqXHR.responseText);
	}
      }
    });

    $.ajax({
	'url': '/forms',
	'type': 'POST',
	'dataType': 'json',
	'data': doc
    })
     .done(function() { alert("success"); })
     .fail(function() { alert("error"); })
     .always(function() { alert("complete"); })
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
