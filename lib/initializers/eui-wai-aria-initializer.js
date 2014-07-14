import Ember from 'ember';

export default {
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
