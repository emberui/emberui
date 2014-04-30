define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var widthsupport;

    widthsupport = Em.Mixin.create({
      attributeBindings: ['computedWidth:style'],
      computedWidth: Em.computed('size', 'width', function() {
        var width, widths;
        widths = {
          tiny: '100px',
          small: '150px',
          medium: '200px',
          large: '250px'
        };
        width = this.get('width') || widths[this.get('size')] || widths['medium'];
        return "width: " + width + ";";
      })
    });

    __exports__["default"] = widthsupport;
  });