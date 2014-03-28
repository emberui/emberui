"use strict";
var disabledsupport;

disabledsupport = Em.Mixin.create({
  classNameBindings: ['isDisabled:eui-disabled'],
  disabled: false,
  isDisabled: Em.computed(function() {
    if (this.get('disabled') || this.get('loading')) {
      return true;
    }
  }).property('disabled', 'loading')
});

exports["default"] = disabledsupport;