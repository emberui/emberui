`import styleSupport from '../mixins/style-support'`
`import sizeSupport from '../mixins/size-support'`
`import poplistComponent from '../components/eui-poplist'`

dropbutton = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'eui-dropbutton'
  showPoplist: false


  # Width of the poplist

  listWidth: 'auto'


  # Action for the left button

  primaryAction: Em.computed 'options', ->
    @get('options').findBy 'primary', true


  # If the selection changes peform the action and reset it so it can get triggered
  # again if same option is selected

  selection: Ember.computed
    get: (key) ->
      return null

    set: (key, value) ->
      action = value.get('action')
      @triggerAction { action } if action
      

  # List of options without any primary actions

  optionsWithoutPrimaryAction: Ember.computed.filter 'options', (option) ->
    return not option.primary


  actions:
    toggleWindow: ->
      @toggleProperty('showPoplist')

    primaryAction: ->
      @sendAction 'primaryAction.action', @

`export default dropbutton`
