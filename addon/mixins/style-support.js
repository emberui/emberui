import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['computedStyle'],
  style: 'default',

  computedStyle: Ember.computed(function() {
    return 'eui-' + this.get('style');
  }).property('style')
});
