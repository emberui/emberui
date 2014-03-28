`import styleSupport from 'build/mixins/style-support'`
`import sizeSupport from 'build/mixins/size-support'`
`import poplistComponent from 'build/components/eui-poplist'`

dropbutton = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'div'
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton']
  poplistIsOpen: false

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
      unless @get('poplistIsOpen')
        poplistComponent.show
          targetObject: @
          # unsure why bindings have to be created this way and opposed to how it is done for options below
          isOpenBinding: 'targetObject.poplistIsOpen'
          selectionBinding: 'targetObject.selection'
          options: @get('options')
          labelPath: 'label'
          style: 'bubble'

    primaryAction: ->
      @sendAction 'primaryAction.action', @

`export default dropbutton`
