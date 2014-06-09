# Calculates if being used on mobile device

mobileDetection = Em.Mixin.create
  isMobileDevice: (->
    devicePixelRatio = window.devicePixelRatio || 1
    width = window.innerWidth / devicePixelRatio
    height = window.innerHeight / devicePixelRatio

    return width <= 800 && height <= 600
  ).property()

`export default mobileDetection`
