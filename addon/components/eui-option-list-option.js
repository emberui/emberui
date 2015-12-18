import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['eui-option-list--list-item'],
  classNameBindings: ['isHighlighted:eui-highlighted'],

  option: null,
  highlights: null,

  isHighlighted: Ember.computed('option', 'highlights.[]', function() {
    if (!this.get('highlights')) {
      return false;
    }

    let option = this.get('option');

    if (option && option.then && option.isFulfilled) {
      option = option.content;
    }

    return this.get('highlights').indexOf(option) !== -1;
  })
});
