import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['eui-option-list--list-item'],
  classNameBindings: ['isHighlighted:eui-highlighted'],

  option: null,
  highlights: null,

  isHighlighted: Ember.computed('option', 'highlights.@each', function() {
    return this.get('highlights').indexOf(this.get('option')) !== -1;
  })
});
