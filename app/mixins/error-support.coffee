errorSupport = Em.Mixin.create
  classNameBindings: ['errorState:eui-error']

  forceErrorCheck: false

  focusIn: ->
    @set("isEntered", false)

  focusOut: ->
    @set("isEntered", true)

  errorMessage: Em.computed 'errorState', 'error', ->
    error = @get 'error'

    if @get('errorState') and typeof(error) is 'string'
      error
    else
      null

  errorState: Em.computed 'isEntered', 'forceErrorCheck', 'error', 'value', ->
    errorState = @_errorState()
    @set '_previousErrorState', errorState
    errorState

  _errorState: ->
    switch @get('_previousErrorState')
      when undefined
        if Em.isBlank(@get('value')) and not @get('forceErrorCheck')
          return false
      when false
        if not @get('isEntered') and not @get('forceErrorCheck')
          return false

    !!@get('error')

`export default errorSupport`
