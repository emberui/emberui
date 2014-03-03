`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import popupComponent from 'appkit/components/eui-popup'`

select = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNames: ['eui-select']
  classNameBindings: ['selected::eui-placeholder']

  popupIsOpen: false
  options: []
  labelPath: 'label'
  valuePath: 'value'

  label: Em.computed ->
    labelPath = @get('labelPath')
    return @get("selected.#{labelPath}") || @get('placeholder')
  .property('selected', 'placeholder', 'labelPath')

  value: Ember.computed (key, value) ->
    # setter
    if arguments.length is 2
      valuePath = @get('valuePath')
      selected = value
      selected = @get('options').findProperty(valuePath, value) if valuePath
      @set('selected', selected)
      value

    # getter
    else
      valuePath = @get('valuePath')
      if valuePath then @get("selected.#{valuePath}") else null
  .property 'selected'

  # Set the initial selected option based on the value of the select
  setInitialSelected: (->
    valuePath = @get('valuePath')
    value = @get('value')
    value = @get('options').findProperty(valuePath, value) if valuePath
    @set('selected', value)
  ).on('init')

  actions:
    toggleWindow: ->
      unless @get('popupIsOpen')
        popupComponent.show
          targetObject: @
          isOpenBinding: 'targetObject.popupIsOpen'
          selectedBinding: 'targetObject.selected'
          options: @get('options')
          style: 'bubble'
          labelPath: @get('labelPath')
          event: 'select'

`export default select`
