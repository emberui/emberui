$.Velocity.Sequences.euiPopcalOpenDefault = (element, options) ->
  $.Velocity.animate element, {
    opacity: [1, 0]
    scaleX: [1, 0.7]
    scaleY: [1, 0.7]
  }, {
    duration: options.duration or 100
  }
