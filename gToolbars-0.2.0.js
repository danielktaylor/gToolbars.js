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

function toggle(btn, callHandler) {
  if ($(btn).hasClass("gt-dropdown")) {
    handleDropdownClick(btn, null);
    return;
  }

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
  if ($(btn).hasClass("gt-dropdown") && !$(btn).hasClass("gt-item-active")) {
    handleDropdownClick(btn, null);
    return;
  }

  if (!$(btn).hasClass("gt-item-active")) {
    $(btn).addClass("gt-item-active");
    if (callHandler === true) {
      // TODO onHandler();
    }
  }
}

function triggerDeactivate(btn, callHandler) {
  if ($(btn).hasClass("gt-dropdown") && $(btn).hasClass("gt-item-active")) {
    handleDropdownClick(btn, null);
    return;
  }

  if ($(btn).hasClass("gt-item-active")) {
    $(btn).removeClass("gt-item-active");
    if (callHandler === true) {
      // TODO offHandler();
    }
  }
}

// Handle all submenus

$('.gt-dropdown').each(function(i, obj) {
  $(obj).click(function(event) {
    var button = $(event.target).closest(".gt-dropdown");
    handleDropdownClick(button, $(event.target));
  });
});

function handleDropdownClick(button, target) {
  var popup = $(".gt-submenu", button);
  var visible = popup.is(":visible");

  if (visible) {
    // We're closing the submenu
    var clickedButton = target === null || target.attr('id') === button.attr('id');
    var noAutoClose = $(".gt-submenu", button).hasClass("gt-no-auto-close");
    if (!clickedButton && noAutoClose) {
      return;
    }

    closeSubmenu(button);
    $(document).unbind("click.gt-submenu");
  } else {
    // We're opening the submenu

    // close other submenus
    $(".gt-submenu").addClass("gt-noshow");
    $(".gt-item.gt-dropdown").removeClass("gt-item-active");

    button.addClass("gt-item-active");
    $(".mdl-tooltip").addClass("gt-noshow");

    var x = button.offset().top + 27;
    var y = button.offset().left;
    popup.css({top: x, left: y});
    popup.removeClass("gt-noshow");

    setTimeout(function(){
      $(document).bind("click.gt-submenu", function(event, noTooltips) {
        var target = $(event.target);
        if (target.hasClass("gt-dropdown") || target.closest('.gt-submenu').length > 0) {
          // Don't do anything if the other handler will be called
          return;
        }

        closeSubmenu(button, noTooltips);
        $(document).unbind("click.gt-submenu");
      });
    }, 10); // wait to set click handler so it's not called instantly by this click

  }
}

function closeSubmenu(menu, noTooltips) {
  menu.removeClass("gt-item-active");
  menu.children(".gt-submenu").addClass("gt-noshow");

  if (noTooltips !== true) {
    // Delay showing of tooltips to prevent flashing behavior
    setTimeout(function(){ $(".mdl-tooltip").removeClass("gt-noshow"); }, 250);
  }
}
