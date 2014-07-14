define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    __exports__["default"] = {
      name: 'emberui-wai-aria',

      initialize: function(container) {
        Ember.TextSupport.reopen({
          attributeBindings: [
            'aria-expanded',
            'aria-autocomplete',
            'aria-owns',
            'aria-activedescendant'
          ]
        });
      }
    };
  });