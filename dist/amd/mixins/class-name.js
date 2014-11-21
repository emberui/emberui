define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var classname;

    classname = Em.Mixin.create({
      classNameBindings: ['className'],
      className: Em.computed('size', 'style', function() {
        var baseClass, size, style;
        baseClass = this.get('baseClass');
        size = this.get('size');
        style = this.get('style');
        if (size) {
          return "eui-" + baseClass + "-" + size + "-" + style;
        } else {
          return "eui-" + baseClass + "-" + style;
        }
      })
    });

    __exports__["default"] = classname;
  });