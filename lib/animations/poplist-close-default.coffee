$.Velocity.Redirects.euiPoplistCloseDefault = (element, options) ->
  component = $(element).find('.eui-component')

  $.Velocity.animate component, {
    opacity: [0, 1]
    marginTop: ["6px", "-4px"]
  }, {
    duration: options.duration or 200
    complete: options.complete
  }
