// This JavaScript to make the header collapse into small sticky header when scroll
$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('#header').addClass("sticky");
    $('#header-title').addClass("sticky");
    $('#header-profile').addClass("sticky");
    $('#header-uni-logo').addClass("sticky");
  } else {
    $('#header').removeClass("sticky");
    $('#header-title').removeClass("sticky");
    $('#header-profile').removeClass("sticky");
    $('#header-uni-logo').removeClass("sticky");
  }
});

$(window).load(function() {
  setTimeout(function() {
    $('#group-container').css('margin-top', $('#header').height() + 'px');
  }, 500);
});

$(window).resize(function() {
    $('#group-container').css('margin-top', $('#header').height() + 'px');
});
