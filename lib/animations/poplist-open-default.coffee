$.velocity.Sequences.euiPoplistOpenDefault = (element, options) ->
  $.velocity.animate element, {
    opacity: [1, 0]
    marginTop: ["-4px", "-14px"]
  }, {
    duration: options.duration or 200
  }
