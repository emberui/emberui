$.Velocity.Redirects.euiPoplistOpenDefault = (element, options) ->
  component = $(element).find('.eui-component')

  $.Velocity.animate component, {
    opacity: [1, 0]
    marginTop: ["-4px", "-14px"]
  }, {
    duration: options.duration or 200
  }
