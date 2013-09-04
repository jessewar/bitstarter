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

// create message box asking the user for a passcode
function promptForPassword() {

  // function to be called upon completing ajax post request
  var helper = function(doc) {
    if (doc === null) {
      alert("password is invalid, please try again");
    } else {
      var name = doc.farmName;
      $('#farm-name-textbox').val(name);

      alert("post successful" + JSON.stringify(doc));
      Apprise('close');
    }
  };

  var options = {
      animation: 700, // Animation speed
      buttons: {
	  confirm: {
	      action: function(e) {
		var input = e.input;
		var doc = { 'password': input };
		$('#test3').text(input);
		 // make a post request with the data contained in the forms
		 $.ajax({
		     'url': '/forms',
		     'type': 'POST',
		     'dataType': 'json', // the datatype of the data sent back from the server to the client
		     'data': doc
		 })
		  .done(helper);

//		Apprise('close');
	      },
	      className: null, // Custom class name(s)
	      id: 'confirm', // Element ID
	      text: 'Submit', // Button text
	      }
	  },
      input: true, // require input dialog
      override: true, // Override browser navigation while Apprise is visible
  };

  Apprise('Please enter passcode:', options);
}

// create a POST request with the form data when the submit button is pressed
function submitClicked() {
  $('.btn').on('click', function() {
    var farmName = getFarmName();
    var farmTypes = getFarmTypes();

    var doc = {'farmName': farmName,
	       'farmTypes': farmTypes};

    // make a post request with the data contained in the forms
    $.ajax({
	'url': '/content',
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
