"use strict";
var stylesupport;

stylesupport = Em.Mixin.create({
  classNameBindings: ['computedStyle'],
  style: 'default',
  computedStyle: Em.computed(function() {
    return 'eui-' + this.get('style');
  }).property('style')
});

exports["default"] = stylesupport;