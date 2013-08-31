$(document).ready(function() {
  configureAjax();
  promptForPassword();  
  submitClicked();
});

// add detailed error messages if an AJAX request fails
function configureAjax() {
  // ajax default error handling function
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
}

function promptForPassword() {
  Apprise('Please enter passcode:', { input: true });
}

function submitClicked() {
  $('.btn').on('click', function() {
    var farmName = getFarmName();
    var farmTypes = getFarmTypes();

    var doc = {'farmName': farmName,
	       'farmTypes': farmTypes};

    // make a post request with the data contained in the forms
    $.ajax({
	'url': '/forms',
	'type': 'POST',
	'dataType': 'json',
	'data': doc
    })
     .done(function() { alert("success: your page has been modified"); }); // alert the user that the modifications have been made
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

