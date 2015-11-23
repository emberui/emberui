import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['computedStyle'],
  style: 'default',

  computedStyle: Ember.computed('style', function() {
    return 'eui-' + this.get('style');
  })
});
