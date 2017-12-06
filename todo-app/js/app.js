// Mark todo as done/undone when clicked
$('li').on('click', function(){
  $(this).toggleClass('todo--done');
});
