import Ember from 'ember';

// Calculates if being used on mobile device
export default Ember.Mixin.create({
  isMobileDevice: Ember.computed('', function() {
    return window.innerWidth <= 540 || window.innerHeight <= 540;
  })
});
