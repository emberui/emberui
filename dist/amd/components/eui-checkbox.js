define(
  ["../mixins/error-support","../mixins/style-support","../mixins/size-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var errorSupport = __dependency1__["default"] || __dependency1__;
    var styleSupport = __dependency2__["default"] || __dependency2__;
    var sizeSupport = __dependency3__["default"] || __dependency3__;
    var checkbox;

    checkbox = Em.Component.extend(errorSupport, styleSupport, sizeSupport, {
      classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class'],
      attributeBindings: ['role', 'value:aria-checked', 'disabled:aria-disabled'],
      role: 'checkbox',
      tagName: 'eui-checkbox',
      value: false,
      disabled: false,
      click: function() {
        if (!this.get('disabled')) {
          return this.toggleProperty('value');
        }
      }
    });

    __exports__["default"] = checkbox;
  });