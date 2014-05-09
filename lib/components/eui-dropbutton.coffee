`import styleSupport from '../mixins/style-support'`
`import sizeSupport from '../mixins/size-support'`
`import poplistComponent from '../components/eui-poplist'`

dropbutton = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'eui-dropbutton'
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton']
  poplistIsOpen: false


  # Width of the poplist

  listWidth: 'auto'


  # Action for the left button

  primaryAction: Em.computed 'options', ->
    @get('options').findBy 'primary', true


  # If the selection changes peform the action and reset it so it can get triggered
  # again if same option is selected

  peformSecondaryAction: (->
    action = @get 'selection.action'
    @triggerAction { action } if action
    @set 'selection', null
  ).observes 'selection'


  # List of options without any primary actions

  optionsWithoutPrimaryAction: Ember.computed.filter 'options', (option) ->
    return not option.primary


  actions:
    toggleWindow: ->
      unless @get('poplistIsOpen')
        poplistComponent.show
          targetObject: @
          isOpenBinding: 'targetObject.poplistIsOpen'
          selectionBinding: 'targetObject.selection'
          optionsBinding: 'targetObject.optionsWithoutPrimaryAction'
          labelPath: 'label'
          style: 'default'
          listWidth: @get 'listWidth'
          animationStyle: @get 'animationStyle'

    primaryAction: ->
      @sendAction 'primaryAction.action', @

`export default dropbutton`
