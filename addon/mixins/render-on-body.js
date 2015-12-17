import Ember from 'ember';

export default Ember.Mixin.create({
  appendToBody: Ember.on('didInsertElement', function() {
    document.body.appendChild(this.element);
  }),

  removeFromBody: Ember.on('willDestroyElement', function() {
    this.element.parentNode.removeChild(this.element);
  })
});
