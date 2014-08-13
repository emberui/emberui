define(
  ["../mixins/style-support","../mixins/size-support","../mixins/disabled-support","../mixins/width-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var sizeSupport = __dependency2__["default"] || __dependency2__;
    var disabledSupport = __dependency3__["default"] || __dependency3__;
    var widthSupport = __dependency4__["default"] || __dependency4__;
    var button;

    button = Em.Component.extend(styleSupport, sizeSupport, disabledSupport, widthSupport, {
      classNameBindings: [':eui-button', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class'],
      tagName: 'eui-button',
      label: null,
      icon: null,
      trailingIcon: null,
      loading: null,
      disabled: null,
      action: null,
      "class": null,
      type: 'button',
      width: 'auto',
      ariaOwns: null,
      ariaHaspopup: null,
      click: function(event) {
        event.preventDefault();
        return this.sendAction('action', this.get('context'));
      }
    });

    __exports__["default"] = button;
  });