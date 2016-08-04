import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['eui-select-time--slot'],
  classNameBindings: ['isSelected:eui-select-time--slot--selected'],
  tagName: 'li',

  selection: null,

  isSelected: Ember.computed('hour', 'selection', function() {
    const selection = this.get('selection');
    const hour = this.get('hour.value');

    return this.get('selection').hour() === hour;
  })
});
