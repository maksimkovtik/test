$(document).ready(function(){
  var paths = $("path");
  for(i = 0; i < paths.length; i++) {
      paths[i].style.animationDelay = String(i * 0.3) + 's';
  };

  $("select").click(function(){
    $(this).parent().toggleClass('rotate');
  });


});
