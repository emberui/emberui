# Calculates if being used on mobile device

mobileDetection = Em.Mixin.create
  isMobileDevice: Ember.computed '', ->
    return true if window.innerWidth <= 540 || window.innerHeight <= 540

`export default mobileDetection`
