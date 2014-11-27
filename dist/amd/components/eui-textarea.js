define(
  ["../mixins/class-name","../mixins/error-support","../mixins/text-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var className = __dependency1__["default"] || __dependency1__;
    var errorSupport = __dependency2__["default"] || __dependency2__;
    var textSupport = __dependency3__["default"] || __dependency3__;
    var textarea;

    textarea = Em.Component.extend(errorSupport, textSupport, className, {
      attributeBindings: ['computedWidthAndHeight:style'],
      tagName: 'eui-textarea',
      baseClass: 'input',
      style: 'default',
      size: 'medium',
      height: null,
      computedWidthAndHeight: Em.computed('size', 'width', 'height', function() {
        var height, heights, width, widths;
        widths = {
          tiny: '100px',
          small: '150px',
          medium: '200px',
          large: '250px'
        };
        heights = {
          tiny: '50px',
          small: '75px',
          medium: '100px',
          large: '125px'
        };
        width = this.get('width') || widths[this.get('size')] || widths['medium'];
        height = this.get('height') || heights[this.get('size')] || heights['medium'];
        return "width: " + width + "; height: " + height + ";";
      })
    });

    __exports__["default"] = textarea;
  });