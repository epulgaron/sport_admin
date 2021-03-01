
(function(window, document, $, undefined){

  $(function(){
    jQuery(".loader").fadeOut('slow');
  });

})(window, document, window.jQuery);

(function(window, document, $, undefined){

  $(function(){
    var scrollbar = jQuery(".scrollbar");
    if (scrollbar.length > 0) {
      $('.scroll_dark').mCustomScrollbar({
        theme:"minimal-dark",
        setHeight: false,
        mouseWheel: {
          normalizeDelta: true,
          scrollAmount: '200px',
          contentTouchScroll: true,
          deltaFactor: '200px'
        },
        advanced: {
          autoScrollOnFocus: 'a[tabindex]'
        }
      });
      $('.scroll_light').mCustomScrollbar({
        theme:"minimal",
        setHeight: false,
        mouseWheel: {
          normalizeDelta: true,
          scrollAmount: '200px',
          contentTouchScroll: true,
          eltaFactor: '200px'
        },
        advanced: {
          autoScrollOnFocus: 'a[tabindex]'
        }
      });
    }
  });

})(window, document, window.jQuery);

(function(window, document, $, undefined){

  $(function(){
    var sidebarNav = jQuery(".sidebar-nav");
    if (sidebarNav.length > 0) {
      $('#sidebarNav').metisMenu();
    }
  });

})(window, document, window.jQuery);

(function(window, document, $, undefined){

  $(function(){
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);

    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    }
  });


  $('.mobile-toggle').on('click', function() {
    $('body').toggleClass('sidebar-toggled');
  });

  $(document).on('click', '.mega-menu.dropdown-menu', function (e) {
    e.stopPropagation();
  });

  $('.sidebar-toggle').on('click', function() {
    $('body').toggleClass('sidebar-mini');
    $('.app-navbar').toggleClass('expand');
  });

  $('.app-navbar').hover(function() {
    if($('body').hasClass('sidebar-mini')) {
      $('.navbar-header').toggleClass('expand');
    }
  });

  $('.search').on('click', function() {
    $('.search-wrapper').fadeIn(200);
  });

  //Search Box Close
  $('.close-btn').on('click', function() {
    $('.search-wrapper').fadeOut(200);
  });

  $('.mobile-toggle').on('click', function() {
    $('body').toggleClass('sidebar-toggled');
  });

})(window, document, window.jQuery);
