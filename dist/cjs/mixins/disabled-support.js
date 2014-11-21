"use strict";
var disabledsupport;

disabledsupport = Em.Mixin.create({
  classNameBindings: ['isDisabled:eui-disabled'],
  disabled: false,
  isDisabled: Em.computed('disabled', function() {
    if (this.get('disabled')) {
      return true;
    }
  })
});

exports["default"] = disabledsupport;