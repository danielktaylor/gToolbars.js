function registerButton(btn, handler) {

  // TODO remember handlers

  $(btn).click(handler);
}

function registerToggleButton(btn, onHandler, offHandler) {

  // TODO remember handlers

  $(btn).click(function() {
    if ($(btn).hasClass("gt-item-active")) {
      $(btn).removeClass("gt-item-active");
      offHandler();
    } else {
      $(btn).addClass("gt-item-active");
      onHandler();
    }
  });
}

// Programmatically press buttons

function trigger(btn, callHandler) {
  if ($(btn).hasClass("gt-item-active")) {
    $(btn).removeClass("gt-item-active");
    if (callHandler === true) {
      // TODO offHandler();
    }
  } else {
    $(btn).addClass("gt-item-active");
    if (callHandler === true) {
      // TODO onHandler();
    }
  }
}

function triggerActivate(btn, callHandler) {
  $(btn).addClass("gt-item-active");
  if (callHandler === true) {
    // TODO onHandler();
  }
}

function triggerDeactivate(btn, callHandler) {
  $(btn).removeClass("gt-item-active");
  if (callHandler === true) {
    // TODO offHandler();
  }
}

// Handle all submenus

$('.gt-dropdown').each(function(i, obj) {
  $(obj).click(function(event) {
    var button = $(this);
    var popup = $(".gt-submenu", button);
    var visible = popup.is(":visible");

    if (visible) {
      // We're closing the submenu
      var clickedButton = event.target.id === button.attr('id');
      var noAutoClose = $(".gt-submenu", button).hasClass("gt-no-auto-close");
      if (!clickedButton && noAutoClose) {
        return;
      }

      closeSubmenu(button);
      $(document).unbind("click.submenu");
    } else {
      // We're opening the submenu
      $(document).trigger("click.submenu", true);

      button.addClass("gt-item-active");
      $(".mdl-tooltip").addClass("gt-noshow");

      var x = button.offset().top + 27;
      var y = button.offset().left;
      popup.css({top: x, left: y});
      popup.removeClass("gt-noshow");

      $(document).bind("click.submenu", function(event, noTooltips) {
        if (event.target.id === button.attr('id')) {
          return;
        }

        closeSubmenu(button, noTooltips);
        $(document).unbind("click.submenu");
      });
    }
  });
});

function closeSubmenu(menu, noTooltips) {
  menu.removeClass("gt-item-active");
  menu.children(".gt-submenu").addClass("gt-noshow");

  if (noTooltips !== true) {
    // Delay showing of tooltips to prevent flashing behavior
    setTimeout(function(){ $(".mdl-tooltip").removeClass("gt-noshow"); }, 200);
  }
}
