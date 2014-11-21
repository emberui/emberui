define(
  [],
  function() {
    "use strict";
    $.Velocity.Redirects.euiPoplistOpenDefault = function(element, options) {
      var component;
      component = $(element).find('.eui-component');
      return $.Velocity.animate(component, {
        opacity: [1, 0],
        marginTop: ["-4px", "-14px"]
      }, {
        duration: options.duration || 200
      });
    };
  });