define(
  ["../mixins/class-name","../mixins/error-support","../mixins/text-support","../mixins/width-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var className = __dependency1__["default"] || __dependency1__;
    var errorSupport = __dependency2__["default"] || __dependency2__;
    var textSupport = __dependency3__["default"] || __dependency3__;
    var widthSupport = __dependency4__["default"] || __dependency4__;
    var input;

    input = Em.Component.extend(errorSupport, textSupport, className, widthSupport, {
      tagName: 'eui-input',
      baseClass: 'input',
      style: 'default',
      size: 'medium',
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