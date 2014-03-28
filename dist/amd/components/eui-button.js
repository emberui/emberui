define(
  ["../mixins/style-support","../mixins/size-support","../mixins/disabled-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var sizeSupport = __dependency2__["default"] || __dependency2__;
    var disabledSupport = __dependency3__["default"] || __dependency3__;
    var button;

    button = Em.Component.extend(styleSupport, sizeSupport, disabledSupport, {
      classNameBindings: [':eui-button', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class'],
      label: null,
      icon: null,
      trailingIcon: null,
      loading: null,
      disabled: null,
      action: null,
      "class": null,
      click: function(event) {
        event.preventDefault();
        return this.sendAction('action', this.get('context'));
      }
    });

    __exports__["default"] = button;
  });