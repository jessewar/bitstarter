// Execute when document is loaded
$(document).ready(function() {
  buttonClick();
});

// Changes navbar buttons when pressed
// TODO: fix navbar disappearing issue for chrome
var buttonClick = function() {
  $('.nav-button').on('click', function() {
    $('.nav-button.active').removeClass('active'); // find active button and turn inactive
    $(this).addClass('active');
  });
};
