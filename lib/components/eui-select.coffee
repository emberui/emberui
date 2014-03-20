`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import poplistComponent from 'appkit/components/eui-poplist'`
`import disabledSupport from 'appkit/mixins/disabled-support'`
`import widthSupport from 'appkit/mixins/width-support'`
`import validationSupport from 'appkit/mixins/validation-support'`

select = Em.Component.extend styleSupport, sizeSupport, disabledSupport, widthSupport, validationSupport,
  tagName: 'div'
  classNames: ['eui-select']
  classNameBindings: ['isDisabled:eui-disabled', 'selection::eui-placeholder', 'poplistIsOpen:eui-active', 'class']

  poplistIsOpen: false
  required: false
  options: []
  labelPath: 'label'
  valuePath: 'value'
  nullValue: new Object()

  optionsWithBlank: (->
    options = @get('options')
    paddedOptions = options[..]

    unless @get('required')
      paddedOptions.unshift(@get('nullValue'))

    return paddedOptions
  ).property 'options.@each required'

  label: (->
    labelPath = @get('labelPath')
    return @get("selection.#{labelPath}") || @get('placeholder')
  ).property 'selection', 'placeholder', 'labelPath'

  selection: Ember.computed (key, value) ->
    # setter
    if arguments.length is 2
      @set('internalSelection', value)
      value

    # getter
    else
      selection = @get('internalSelection')
      nullValue = @get('nullValue')
      if selection == nullValue then null else selection
  .property 'internalSelection'

  value: Ember.computed (key, value) ->
    # setter
    if arguments.length is 2
      valuePath = @get('valuePath')
      selection = value
      selection = @get('options').findProperty(valuePath, value) if valuePath
      @set('selection', selection)
      value

    # getter
    else
      valuePath = @get('valuePath')
      if valuePath then @get("selection.#{valuePath}") else null
  .property 'selection'

  initialization: (->
    # Make sure we have options or things will break badly
    if @get('options') == undefined
      Ember.Logger.error ('EmberUI: eui-select options paramater has undefined value')
      return

    # Create observer for the selection's label so we can monitor it for changes
    labelPath = 'selection.' + @get('labelPath')
    @addObserver(labelPath, -> @notifyPropertyChange 'label')

    # Set the initial selection based on the value
    valuePath = @get('valuePath')
    value = @get('value')
    value = @get('options').findProperty(valuePath, value) if valuePath
    @set('internalSelection', value || @get('nullValue'))
  ).on 'init'

  click: ->
    unless @get('poplistIsOpen')
      poplistComponent.show
        targetObject: @
        isOpenBinding: 'targetObject.poplistIsOpen'
        selectionBinding: 'targetObject.internalSelection'
        options: @get('optionsWithBlank')
        labelPathBinding: 'targetObject.labelPath'
        style: 'flyin'

  # Down Arrow Key opens poplist
  keyDown: (event) ->
    if event.which == 40
      @click()

  # Overide validation-support mixin to check validation on change even if no error
  onChange:  (->
    Ember.run.once(@, 'validateField')
  ).observes 'value'

`export default select`
