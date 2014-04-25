validationsupport = Em.Mixin.create
  classNameBindings: ['errorState:eui-error']

  errorMessage: null
  forceValidate: false

  focusIn: ->
    unless @get('errorState')
      Em.run.schedule 'actions', @, ->
        @set('isEntered', false)

  focusOut: ->
    Em.run.schedule 'actions', @, ->
      @set("isEntered", true)

  errorState: Em.computed 'isInit', 'isEntered', 'forceValidate', 'error', 'value', (key, value, prevValue) ->

    error = @get('error')

    if not (prevValue or @get('isEntered') or @get('forceValidate'))
      return false

    if error
      if typeof(error) is 'string'
        @set 'errorMessage', error
      return true
    else
      @set 'errorMessage', null

  load: ( ->
    if @get('forceValidate') or @get('value')
      @get('isInit')

  ).observes('init')

`export default validationsupport`
