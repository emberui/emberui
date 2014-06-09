# Calculates if being used on mobile device

mobileDetection = Em.Mixin.create
  isMobileDevice: (->
    return window.innerWidth <= 800 && window.innerHeight <= 600
  ).property()

`export default mobileDetection`
