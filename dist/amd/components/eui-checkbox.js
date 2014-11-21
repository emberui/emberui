define(
  ["../mixins/error-support","../mixins/class-name","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var errorSupport = __dependency1__["default"] || __dependency1__;
    var className = __dependency2__["default"] || __dependency2__;
    var checkbox;

    checkbox = Em.Component.extend(errorSupport, className, {
      classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class'],
      attributeBindings: ['role', 'value:aria-checked', 'disabled:aria-disabled'],
      baseClass: 'checkbox',
      style: 'default',
      size: 'medium',
      tagName: 'eui-checkbox',
      role: 'checkbox',
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