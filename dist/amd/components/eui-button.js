define(
  ["../mixins/class-name","../mixins/disabled-support","../mixins/width-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var className = __dependency1__["default"] || __dependency1__;
    var disabledSupport = __dependency2__["default"] || __dependency2__;
    var widthSupport = __dependency3__["default"] || __dependency3__;
    var button;

    button = Em.Component.extend(className, disabledSupport, widthSupport, {
      classNameBindings: ['loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class'],
      baseClass: 'button',
      tagName: 'eui-button',
      style: 'default',
      size: 'medium',
      label: null,
      leadingIcon: null,
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