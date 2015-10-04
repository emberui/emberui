import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['eui-option-list--list-item'],
  classNameBindings: ['isHighlighted:eui-highlighted'],

  option: null,
  highlights: null,

  isHighlighted: Ember.computed('option', 'highlights.[]', function() {
    if (!this.get('option') || !this.get('highlights')) {
      return false;
    }

    return this.get('highlights').indexOf(this.get('option')) !== -1;
  })
});
