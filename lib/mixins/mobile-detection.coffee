# Calculates if being used on mobile device

mobileDetection = Em.Mixin.create
  isMobileDevice: (->
    return true if window.innerWidth <= 540 || window.innerHeight <= 540
  ).property()

`export default mobileDetection`
