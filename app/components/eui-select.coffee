`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import popupComponent from 'appkit/components/eui-popup'`

select = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNames: ['eui-select']
  classNameBindings: ['selected::eui-placeholder']

  popupIsOpen: false
  selected: null

  computedLabel: Em.computed ->
    return @get('selected.label') || @get('label')
  .property('selected', 'label')

  actions:
    toggleWindow: ->
      unless @get('popupIsOpen')
        popupComponent.show
          targetObject: @
          isOpenBinding: 'targetObject.popupIsOpen'
          selectedBinding: 'targetObject.selected'
          options: @get('options')
          style: 'bubble'

`export default select`
