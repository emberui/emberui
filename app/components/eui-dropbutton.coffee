`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import popupComponent from 'appkit/components/eui-popup'`

dropbutton = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton']
  popupIsOpen: false

  primaryAction: Em.computed ->
    @get('options').findBy 'primary', true
  .property 'options'

  # If the selection changes peform the action
  secondaryAction: (->
    action = @get('selection.action')
    @triggerAction({action}) if action
    @set('selection', null)
  ).observes 'selection'

  actions:
    toggleWindow: ->
      unless @get('popupIsOpen')
        popupComponent.show
          targetObject: @
          isOpenBinding: 'targetObject.popupIsOpen'
          selectionBinding: 'targetObject.selection'
          options: @get('options')
          labelPath: 'label'
          style: 'bubble'

    primaryAction: ->
      @sendAction 'primaryAction.action', @

`export default dropbutton`
