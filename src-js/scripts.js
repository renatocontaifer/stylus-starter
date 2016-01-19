$(document).ready(function(){

  $('.menu-anchor').on('click', function() {
    $('.full-container').toggleClass('open');
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var alturaMenu = $('.nav-bar').height();
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 600);
        return false;
      }
    }

  });

  $('.select-area .select').change(function(){
    $text = $(this).find('option:selected').text();
    $(this).parent().find('.select-view p').text($text);
  });

});

  window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);
