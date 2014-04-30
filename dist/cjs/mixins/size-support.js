"use strict";
var sizesupport;

sizesupport = Em.Mixin.create({
  classNameBindings: ['computedSize'],
  size: 'medium',
  computedSize: Em.computed('size', function() {
    return 'eui-' + this.get('size');
  })
});

exports["default"] = sizesupport;