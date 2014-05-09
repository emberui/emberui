define(
  [],
  function() {
    "use strict";
    $.velocity.Sequences.euiPoplistCloseDefault = function(element, options) {
      return $.velocity.animate(element, {
        opacity: [0, 1],
        marginTop: ["6px", "-4px"]
      }, {
        duration: options.duration || 200,
        complete: options.complete
      });
    };
  });