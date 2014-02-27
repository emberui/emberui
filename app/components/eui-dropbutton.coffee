`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import popupComponent from 'appkit/components/eui-popup'`

dropbutton = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton']
  popupIsOpen: false

  primaryAction: Em.computed ->
    @get('actionList').findBy 'primary', true
  .property 'actionList'

  actions:
    toggleWindow: ->
      unless @get('popupIsOpen')
        popupComponent.show
          targetObject: @
          isOpenBinding: 'targetObject.popupIsOpen'
          actionList: @get('actionList')
          style: 'bubble'

    primaryAction: ->
      @sendAction 'primaryAction.action', @

`export default dropbutton`
