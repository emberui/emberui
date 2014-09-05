define(
  ["../mixins/error-support","../mixins/text-support","../mixins/style-support","../mixins/size-support","../mixins/width-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var errorSupport = __dependency1__["default"] || __dependency1__;
    var textSupport = __dependency2__["default"] || __dependency2__;
    var styleSupport = __dependency3__["default"] || __dependency3__;
    var sizeSupport = __dependency4__["default"] || __dependency4__;
    var widthSupport = __dependency5__["default"] || __dependency5__;
    var input;

    input = Em.Component.extend(errorSupport, textSupport, styleSupport, sizeSupport, widthSupport, {
      classNameBindings: [':eui-input'],
      tagName: 'eui-input',
      maxlength: null,
      type: 'text',
      action: null,
      actions: {
        enter: function(context) {
          if (this.get('action')) {
            return this.sendAction('action', context);
          }
        }
      }
    });

    __exports__["default"] = input;
  });