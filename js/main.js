$(document).ready(function($){
  
  /** Contact Info **/
  $('.contact-info :input, .contact-info-mobile :input').focus(function() {
	$(this).addClass("contact-info-focus");});
  
  $('.contact-info :input, .contact-info-mobile :input').blur(function() { $(this).removeClass("contact-info-focus"); });
  
  $('.contact-info :input, .contact-info-mobile :input').blur(function() {
    tmpval = $(this).val();
    if(tmpval !== '' ) {
      $(this).next().addClass('contact-info-label-focus');
      $(this).addClass('contact-info-focus');
    }else {
      $(this).next().removeClass('contact-info-label-focus');
    }
  });
  
  
  /** Modal Popup for Deleting Cart Item **/
  $('a.btnDelete').on('click', function (e) {
        e.preventDefault();
        var id = $(this).closest('tr').data('id');
        $('#myModal').data('id', id).modal('show');
    });

    $('#btnDelteYes').click(function () {
        var id = $('#myModal').data('id');
        $('[data-id=' + id + ']').remove();
        $('#myModal').modal('hide');
    });
  
  /** Toggle Sliding Filter Menu **/
  $('.toggle-filter').on('click', function() {
    var toggle=$(this).data('toggle');
    $('#filter-menu').css('display', 'block');
    $(this).data('toggle', !toggle);
  });
  
  /** Slick Carousel Settings **/
  $('.center').slick({
    centerMode: true,
    arrows:true,
    centerPadding: '60px',
    infinite: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
  
  $('.center-2').slick({
    centerMode: true,
    variableWidth: true,
    infinite: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
  
  $('.variable-width').slick({
    centerMode: true,
    variableWidth: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
  
  
  $(".regular").slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 6000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
  });
  
  $('.carousel').bcSwipe({ threshold: 50 });

  //open/close mega-navigation
  $('.cd-dropdown-trigger').on('click', function(event){
      event.preventDefault();
      toggleNav();
  });

  //close meganavigation
  $('.cd-dropdown .cd-close').on('click', function(event){
      event.preventDefault();
      toggleNav();
  });

  //on mobile - open submenu
  $('.has-children').children('a').on('click', function(event){
      //prevent default clicking on direct children of .has-children 
      event.preventDefault();
      var selected = $(this);
      selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
  });

  //submenu items - go back link
  $('.go-back').on('click', function(){
      var selected = $(this),
          visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
      selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
  }); 

  function toggleNav(){
      var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
      $('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
      $('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
      if( !navIsVisible ) {
          $('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
              $('.has-children ul').addClass('is-hidden');
              $('.move-out').removeClass('move-out');
              $('.is-active').removeClass('is-active');
          });	
      }
  }
  
  
  //open/close mega-navigation 
	/*$('.desktop-dropdown-trigger').on( "mouseenter", function(event){
		event.preventDefault();
		toggleNav1();
	});

	//close meganavigation
	$('.desktop-dropdown').off('mouseenter', function(event){
		event.preventDefault();
		toggleNav1();
	});*/

	//on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
	var submenuDirection = ( !$('.desktop-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
	$('.desktop-dropdown-content').menuAim({
        activate: function(row) {
        	$(row).children().addClass('is-active').removeClass('fade-out');
        	if( $('.desktop-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
        },
        deactivate: function(row) {
        	$(row).children().removeClass('is-active');
        	if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
        		$('.desktop-dropdown-content').find('.fade-in').removeClass('fade-in');
        		$(row).children('ul').addClass('fade-out')
        	}
        },
        exitMenu: function() {
        	$('.desktop-dropdown-content').find('.is-active').removeClass('is-active');
        	return true;
        },
        submenuDirection: submenuDirection,
    });
  
    function toggleNav1(){
      var navIsVisible1 = ( !$('.desktop-dropdown').hasClass('dropdown-is-active') ) ? true : false;
      $('.desktop-dropdown').toggleClass('dropdown-is-active', navIsVisible1);
      $('.desktop-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible1);
      if( !navIsVisible1 ) {
          $('.desktop-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
              $('.has-children ul').addClass('is-hidden');
              $('.move-out').removeClass('move-out');
              $('.is-active').removeClass('is-active');
          });	
      }
    }
  
  
  


  
  
  //Reduce quantity by 1 if clicked
  $(document).on("click", ".product-quantity-subtract", function(e){
    var value = $(".product-quantity-input").val();
    //console.log(value);
    var newValue = parseInt(value) - 1;
    if(newValue < 0) newValue=0;
    $(".product-quantity-input").val(newValue);
    CalcPrice(newValue);
  });

  //Increase quantity by 1 if clicked
  $(document).on("click", ".product-quantity-add", function(e){
    var value = $(".product-quantity-input").val();
    //console.log(value);
    var newValue = parseInt(value) + 1;
    $(".product-quantity-input").val(newValue);
    CalcPrice(newValue);
  });
  
  

  //IE9 placeholder fallback
  //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
  if(!Modernizr.input.placeholder){
      $('[placeholder]').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
              input.val('');
          }
      }).blur(function() {
          var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
              input.val(input.attr('placeholder'));
          }
      }).blur();
      $('[placeholder]').parents('form').submit(function() {
          $(this).find('[placeholder]').each(function() {
              var input = $(this);
              if (input.val() == input.attr('placeholder')) {
                  input.val('');
              }
          })
      });
  }
  
  
});


/** JS for Upload File Input **/
'use strict';

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));




