import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['className'],

  className: Ember.computed('size', 'style', function() {
    const baseClass = this.get('baseClass');
    const size = this.get('size');
    const style = this.get('style');

    if (size) {
      return `eui-${baseClass}-${size}-${style}`;
    } else {
      return `eui-${baseClass}-${style}`;
    }
  })
});
