`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import popupComponent from 'appkit/components/eui-popup'`

select = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNames: ['eui-select']
  classNameBindings: ['selection::eui-placeholder']

  popupIsOpen: false
  options: []
  labelPath: 'label'
  valuePath: 'value'

  label: Em.computed ->
    labelPath = @get('labelPath')
    return @get("selection.#{labelPath}") || @get('placeholder')
  .property('selection', 'placeholder', 'labelPath')

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

  # Set the initial selection option based on the value of the select
  setInitialselection: (->
    return if @get('selection')
    valuePath = @get('valuePath')
    value = @get('value')
    value = @get('options').findProperty(valuePath, value) if valuePath
    @set('selection', value)
  ).on('init')

  actions:
    toggleWindow: ->
      unless @get('popupIsOpen')
        popupComponent.show
          targetObject: @
          isOpenBinding: 'targetObject.popupIsOpen'
          selectionBinding: 'targetObject.selection'
          options: @get('options')
          style: 'bubble'
          labelPath: @get('labelPath')
          event: 'select'

`export default select`
