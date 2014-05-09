"use strict";
$.velocity.Sequences.euiPoplistOpenDefault = function(element, options) {
  return $.velocity.animate(element, {
    opacity: [1, 0],
    marginTop: ["-4px", "-14px"]
  }, {
    duration: options.duration || 200
  });
};