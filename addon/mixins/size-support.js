import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['computedSize'],
  size: 'medium',

  computedSize: Ember.computed('size', function() {
    return 'eui-' + this.get('size');
  })
});
