"use strict";
$.Velocity.Sequences.euiPoplistOpenDefault = function(element, options) {
  return $.Velocity.animate(element, {
    opacity: [1, 0],
    marginTop: ["-4px", "-14px"]
  }, {
    duration: options.duration || 200
  });
};