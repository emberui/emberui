define(
  [],
  function() {
    "use strict";
    $.Velocity.Sequences.euiPoplistOpenFlyin = function(element, options) {
      return $.Velocity.animate(element, {
        opacity: [1, 0],
        scaleX: [1, 0.7],
        scaleY: [1, 0.7]
      }, {
        duration: options.duration || 100
      });
    };
  });