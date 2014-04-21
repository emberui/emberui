validationsupport = Em.Mixin.create
  classNameBindings: ['errorState:eui-error']

  errorState: null
  errorMessage: null
  forceValidate: false

  validateField: (type) ->
    error = @get 'error'
    value = @get 'value'
    forceValidate = @get 'forceValidate'

    if type is 'onload' and !value and !forceValidate
      return

    # Error validation libraries may return an array of error messages so we only use the first
    if Ember.isArray(error)
      error = error[0]

    if error
      @set 'errorState', true

      if error and typeof(error) isnt 'boolean'
        @set 'errorMessage', error

    else
      @set 'errorState', false
      @set 'errorMessage', null

  focusOut: -> @validateField()

  onChange:  (->
    if @get 'errorState'
      Ember.run.once @, 'validateField'
  ).observes 'value'

  forceValidation: (->
    @validateField()
  ).observes 'forceValidate'

  validateOnLoad: (->
    @validateField 'onload'
  ).on 'init'

`export default validationsupport`
