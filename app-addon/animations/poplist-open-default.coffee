$.Velocity.Sequences.euiPoplistOpenDefault = (element, options) ->
  $.Velocity.animate element, {
    opacity: [1, 0]
    marginTop: ["-4px", "-14px"]
  }, {
    duration: options.duration or 200
  }
