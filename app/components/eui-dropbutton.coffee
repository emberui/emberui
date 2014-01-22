`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import popupComponent from 'appkit/components/eui-popup'`

dropbutton = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton']

  primaryAction: Em.computed ->
    @get('action').findBy 'primary', true
  .property 'action'

  actions:
    toggleWindow: ->
      popupComponent.show
        items: @get('action')
        origin: @
        style: 'bubble'

    primaryAction: ->
      @sendAction 'primaryAction.action'

`export default dropbutton`
