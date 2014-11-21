"use strict";
$.Velocity.Redirects.euiPoplistCloseDefault = function(element, options) {
  var component;
  component = $(element).find('.eui-component');
  return $.Velocity.animate(component, {
    opacity: [0, 1],
    marginTop: ["6px", "-4px"]
  }, {
    duration: options.duration || 200,
    complete: options.complete
  });
};