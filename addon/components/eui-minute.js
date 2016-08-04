import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['eui-select-time--slot'],
  classNameBindings: ['isSelected:eui-select-time--slot--selected'],
  tagName: 'li',

  selection: null,

  isSelected: Ember.computed('minute', 'selection', function() {
    const selection = this.get('selection');
    const minute = this.get('minute.value');

    return this.get('selection').minute() === minute;
  })
});
