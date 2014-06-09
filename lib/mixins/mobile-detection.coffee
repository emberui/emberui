# Calculates if being used on mobile device

mobileDetection = Em.Mixin.create
  isMobileDevice: (->
    width = window.innerWidth
    height = window.innerHeight
    return true if width <= 800 || height <= 800
  ).property()

`export default mobileDetection`
