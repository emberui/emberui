import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['disabled:eui-disabled'],
  disabled: false
});
