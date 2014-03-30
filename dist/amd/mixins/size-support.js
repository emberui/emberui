define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var sizesupport;

    sizesupport = Em.Mixin.create({
      classNameBindings: ['computedSize'],
      size: 'medium',
      computedSize: Em.computed(function() {
        return 'eui-' + this.get('size');
      }).property('size')
    });

    __exports__["default"] = sizesupport;
  });