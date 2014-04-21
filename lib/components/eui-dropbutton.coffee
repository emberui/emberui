`import styleSupport from '../mixins/style-support'`
`import sizeSupport from '../mixins/size-support'`
`import poplistComponent from '../components/eui-poplist'`

dropbutton = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'eui-dropbutton'
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton']
  poplistIsOpen: false

  primaryAction: Em.computed ->
    @get('options').findBy 'primary', true
  .property 'options'


  # If the selection changes peform the action and reset it so it can get triggered
  # again if same option is selected

  peformSecondaryAction: (->
    action = @get 'selection.action'
    @triggerAction { action } if action
    @set 'selection', null
  ).observes 'selection'


  # List of options without any primary actions

  optionsWithoutPrimaryAction: Ember.computed.filter('options', (option) ->
    return not option.primary
  ).property "options"


  actions:
    toggleWindow: ->
      unless @get('poplistIsOpen')
        poplistComponent.show
          targetObject: @
          isOpenBinding: 'targetObject.poplistIsOpen'
          selectionBinding: 'targetObject.selection'
          optionsBinding: 'targetObject.optionsWithoutPrimaryAction'
          labelPath: 'label'
          style: 'bubble'

    primaryAction: ->
      @sendAction 'primaryAction.action', @

`export default dropbutton`
