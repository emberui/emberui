$.Velocity.Redirects.euiModalCloseFull = (element, options) ->
  calls = [
    {
      element: $(element).find('.eui-modalobject')
      properties: {
        opacity: [0, 1]
        scaleX: [5, 1]
        scaleY: [5, 1]
      }
      options: {
        duration: 200
      }
    }
    {
      element: $(element).find('.eui-overlay')
      properties: {
        opacity: [0, 1]
      }
      options: {
        duration: 400
        complete: options.complete
      }
    }
  ]

  $.each calls, (i, call) ->
    $.Velocity.animate call.element[0], call.properties, call.options
