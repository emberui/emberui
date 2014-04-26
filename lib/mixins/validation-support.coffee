validationsupport = Em.Mixin.create
  classNameBindings: ['errorState:eui-error']

  errorMessage: null
  forceValidate: false

  focusOut: ->
    Em.run.schedule 'actions', @, ->
      @set("isEntered", true)

  errorState: Em.computed 'isEntered', 'forceValidate', 'error', 'value', ->
    errorState = @_errorState()
    @set '_previousErrorState', errorState
    errorState

  _errorState: ->
    switch @get('_previousErrorState')
      when undefined
        if Em.isBlank(@get('value')) and not @get('forceValidate')
          return false
      when false
        if not @get('isEntered') and not @get('forceValidate')
          return false

    if error = @get('error')
      if typeof(error) is 'string'
        @set 'errorMessage', error
      true
    else
      @set 'errorMessage', null
      false

`export default validationsupport`
