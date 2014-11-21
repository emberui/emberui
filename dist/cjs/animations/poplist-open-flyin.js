"use strict";
$.Velocity.Redirects.euiPoplistOpenFlyin = function(element, options) {
  var component;
  component = $(element).find('.eui-component');
  return $.Velocity.animate(component, {
    opacity: [1, 0],
    scaleX: [1, 0.7],
    scaleY: [1, 0.7]
  }, {
    duration: options.duration || 100
  });
};