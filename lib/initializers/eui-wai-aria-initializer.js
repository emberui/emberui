import Ember from 'ember';

export default function() {
  Ember.TextSupport.reopen({
    attributeBindings: [
      'aria-expanded',
      'aria-autocomplete',
      'aria-owns',
      'aria-activedescendant'
    ]
  });
}
