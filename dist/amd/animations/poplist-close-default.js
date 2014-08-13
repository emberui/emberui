define(
  [],
  function() {
    "use strict";
    $.Velocity.Sequences.euiPoplistCloseDefault = function(element, options) {
      return $.Velocity.animate(element, {
        opacity: [0, 1],
        marginTop: ["6px", "-4px"]
      }, {
        duration: options.duration || 200,
        complete: options.complete
      });
    };
  });