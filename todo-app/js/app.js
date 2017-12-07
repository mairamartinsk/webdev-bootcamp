// Mark todo as done/undone when clicked
$('ul').on('click', 'li', function(){
  $(this).toggleClass('todo--done');
});

// Delete todo when X is clicked
$('ul').on('click', 'span', function(event) {
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  event.stopPropagation();
});

// Create new todo when hitting enter on input text
$('input[type="text"]').on('keypress', function(event) {
  // if user presses Enter (keycode 13), get input value
  if (event.which === 13) {
    var newTodo = $(this).val();
    $(this).val('');
    $('ul').append('<li><span><i class="fa fa-trash" aria-hidden="true"></i></span> ' + newTodo + '</li>');
  }
});

// Show/hide input when user clicks on Square icon
$('.fa-plus-square-o').on('click', function() {
  $('input[type="text"]').fadeToggle();
});
