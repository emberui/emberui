validationsupport = Ember.Mixin.create
  computedErrorState: null
  computedErrorMessage: null

  validateField: (type) ->
    hasError = @.get('hasError')
    required = @.get('required')
    value = @.get('value')

    if type is 'onload' and !value
      return

    # Error validation libraries may return an array of error messages so we only use the first
    if Ember.isArray(hasError)
      hasError = hasError[0]

    if hasError or (required and !value)
      @.set 'computedErrorState', true

      if hasError and typeof(hasError) isnt 'boolean'
        @.set 'computedErrorMessage', hasError

    else
      @.set 'computedErrorState', false
      @.set 'computedErrorMessage', null

  focusOut: ->
    @.validateField()

  onChange:  (->
    if @.get('computedErrorState')
      Ember.run.once(@, 'validateField')
  ).observes 'value'

  validateOnLoad: (->
    @.validateField('onload')
  ).on 'init'

`export default validationsupport`
