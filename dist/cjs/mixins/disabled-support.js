"use strict";
var disabledsupport;

disabledsupport = Em.Mixin.create({
  classNameBindings: ['isDisabled:eui-disabled'],
  disabled: false,
  isDisabled: Em.computed('disabled', 'loading', function() {
    if (this.get('disabled') || this.get('loading')) {
      return true;
    }
  })
});

exports["default"] = disabledsupport;