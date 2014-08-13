"use strict";
$.Velocity.Sequences.euiModalOpenFull = function(element, options) {
  var calls;
  calls = [
    {
      element: $(element).find('.eui-modalobject'),
      properties: {
        opacity: [1, 0],
        scaleX: [1, 0.5],
        scaleY: [1, 0.5]
      },
      options: {
        duration: 200
      }
    }, {
      element: $(element).find('.eui-overlay'),
      properties: {
        opacity: [1, 0]
      },
      options: {
        duration: 400,
        complete: options.complete
      }
    }
  ];
  return jQuery.each(calls, function(i, call) {
    return $.Velocity.animate(call.element[0], call.properties, call.options);
  });
};