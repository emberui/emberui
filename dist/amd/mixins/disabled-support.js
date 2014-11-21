define(
  ["exports"],
  function(__exports__) {
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

    __exports__["default"] = disabledsupport;
  });