`import poplistComponent from '../components/eui-poplist'`
`import disabledSupport from '../mixins/disabled-support'`
`import errorSupport from '../mixins/error-support'`
`import widthSupport from '../mixins/width-support'`

select = Em.Component.extend disabledSupport, errorSupport, widthSupport,
  tagName: 'eui-select'
  classNames: ['eui-select']
  classNameBindings: ['isDisabled:eui-disabled', 'selection::eui-placeholder', 'class']

  style: 'default'
  size: 'medium'

  poplistIsOpen: false
  required: false
  options: []
  labelPath: 'label'
  valuePath: 'value'

  _selection: null


  # Width of the poplist

  listWidth: 'auto'


  # Stores a object that we will consider to be null. If this object is selected we
  # will return null instead

  nullValue: new Object()


  # If this field is not required we automatically add a copy of the nullValue object at
  # the top of the list. This acts as a zero value so the user can deselect all options.

  optionsWithBlank: (->
    options = @get 'options'
    paddedOptions = options[..]

    unless @get 'required'
      paddedOptions.unshift @get 'nullValue'

    return paddedOptions
  ).property 'options.@each', 'required'


  # Label of the selected option or the placeholder text

  label: (->
    labelPath = @get 'labelPath'
    return @get("selection.#{labelPath}") || @get 'placeholder'
  ).property 'selection', 'placeholder', 'labelPath'


  # Current option the user has selected. It is a wrapper around _selection
  # which the poplist binds to. It allows us to return null when the user selects
  # the nullValue object we inserted.

  selection: Ember.computed '_selection', (key, value) ->
    # setter
    if arguments.length is 2
      @set '_selection', value
      value

    # getter
    else
      selection = @get '_selection'
      nullValue = @get 'nullValue'
      if selection == nullValue then null else selection


  # Computes the value of the selection based on the valuePath specified by the user.
  # Allows for getting and setting so the user can set the initial value of the select
  # without passing in the full object

  value: Ember.computed 'selection', 'valuePath', (key, value) ->
    # setter
    if arguments.length is 2
      valuePath = @get 'valuePath'
      selection = @get('options').findProperty(valuePath, value) if valuePath
      @set 'selection', selection || value
      value

    # getter
    else
      valuePath = @get 'valuePath'
      if valuePath then @get("selection.#{valuePath}") else null


  initialization: (->
    # Make sure we have options or things will break badly
    if @get('options') is undefined
      Ember.Logger.error ('EmberUI: eui-select options paramater has undefined value')
      return

    # Create observer for the selection's label so we can monitor it for changes
    labelPath = 'selection.' + @get 'labelPath'
    @addObserver(labelPath, -> @notifyPropertyChange 'label')

    # Set the initial selection based on the value
    valuePath = @get 'valuePath'
    value = @get 'value'
    value = @get('options').findProperty(valuePath, value) if valuePath
    @set('_selection', value || @get 'nullValue')
  ).on 'init'


  click: ->
    unless @get 'poplistIsOpen'
      poplistComponent.show
        targetObject: @
        isOpenBinding: 'targetObject.poplistIsOpen'
        selectionBinding: 'targetObject._selection'
        optionsBinding: 'targetObject.optionsWithBlank'
        labelPathBinding: 'targetObject.labelPath'
        style: 'flyin'
        listWidth: @get 'listWidth'
        animationStyle: @get 'animationStyle'


  # Down Arrow Key opens poplist

  keyUp: (event) ->
    if event.which == 40
      event.preventDefault()
      @click()


  # Error check should happen without user having to focus on component

  isEntered: true

`export default select`
