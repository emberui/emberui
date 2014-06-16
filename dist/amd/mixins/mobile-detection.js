define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var mobileDetection;

    mobileDetection = Em.Mixin.create({
      isMobileDevice: (function() {
        if (window.innerWidth <= 540 || window.innerHeight <= 540) {
          return true;
        }
      }).property()
    });

    __exports__["default"] = mobileDetection;
  });