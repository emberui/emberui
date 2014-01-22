`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`

dropbutton = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton']

  primaryAction: Em.computed ->
    action = @get('action').findBy 'primary', true
    return action
  .property 'action'

  actions:
    toggleWindow: ->
      throw "TODO: open window with list of actions"

    primaryAction: ->
      @.sendAction 'primaryAction.action'

`export default dropbutton`
