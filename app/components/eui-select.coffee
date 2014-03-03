`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import popupComponent from 'appkit/components/eui-popup'`

select = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNames: ['eui-select']
  classNameBindings: ['selected::eui-placeholder']

  popupIsOpen: false
  selected: null
  labelPath: 'label'

  computedLabel: Em.computed ->
    labelPath = @get('labelPath')
    return @get("selected.#{labelPath}") || @get('placeholder')
  .property('selected', 'placeholder', 'labelPath')

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

`export default select`
