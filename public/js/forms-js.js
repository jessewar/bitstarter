$(document).ready(function() {
  submitClicked();
});

function submitClicked() {
  var farmTypes = getFarmTypes();
  var farmName = getFarmName();
}

// returns the name of the farm as a string
function getFarmName() {
  $('.btn').on('click', function() {
    var farmName = $('#farm-name-textbox').val();
    $('#test2').text(farmName);

    return farmName;
  });
}

// returns an array containing the types of goods a farm has available
function getFarmTypes() {
  $('.btn').on('click', function() {
    var arr = $('#checkboxes').serializeArray(); // array of objects that were checked

    var farmTypes = [];
    for (var i = 0; i < arr.length; i++) {
      farmTypes[i] = arr[i].name;  // get the types of farm products into an array
    }
    
    $('#test').text(farmTypes.toString());

    return farmTypes;
  });  
}

function putIntoDb(farmName, farmTypes) {
  
}
