$(document).ready(function () {

// Pre-loader
	$(".loaderInner").fadeOut(); 
	$(".loader").delay(400).fadeOut("slow");

// Prevent Scroll to Top
	$('a[href*="#"]').click(function($e) {
			$e.preventDefault();
	});

// menu
	$('.js-menu-toggler').on('click', function() {
		$('.js-collapse').toggleClass('header--collapse-active')
	  $('.js-menu-ham').toggleClass('menu--ham-active');
	});

	// Scroll to Top
 	// Show scroll button
 	$(window).scroll(function() {
    if ( $(this).scrollTop() >= 400 && $(this).width() >= 996 ) {
     $('.js-up').addClass('up-active');
    } else {
     $('.js-up').removeClass('up-active');
    }
  	});

	// Scroll button click event
	 $('.js-up').on('click', function () {
	  window.scrollTo({
	   top: 0,
	   behavior: "smooth"
	  });
	 });

});