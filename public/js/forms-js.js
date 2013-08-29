$(document).ready(function() {
  submitClicked();
});

var submitClicked = function() {
  $('.btn').on('click', function() {
    var str = $('#checkboxes').serializeArray();
    $('#test').text(JSON.stringify(str));        
  });
};
