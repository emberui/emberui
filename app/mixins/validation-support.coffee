validationsupport = Em.Mixin.create
  classNameBindings: ['computedErrorState:eui-error']

  computedErrorState: null
  computedErrorMessage: null

  validateField: (type) ->
    error = @get('error')
    required = @get('required')
    value = @get('value')

    if type is 'onload' and !value
      return

    # Error validation libraries may return an array of error messages so we only use the first
    if Ember.isArray(error)
      error = error[0]

    if error or (required and !value)
      @set 'computedErrorState', true

      if error and typeof(error) isnt 'boolean'
        @set 'computedErrorMessage', error

    else
      @set 'computedErrorState', false
      @set 'computedErrorMessage', null

  focusOut: -> @validateField()

  onChange:  (->
    if @get('computedErrorState')
      Ember.run.once(@, 'validateField')
  ).observes 'value'

  validateOnLoad: (->
    @validateField('onload')
  ).on 'init'

`export default validationsupport`
