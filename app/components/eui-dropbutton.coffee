dropbutton = Ember.Component.extend
  tagName: 'div'
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton']

  primaryAction: Ember.computed ->
    action = @.get('action').findBy 'primary', true
    return action
  .property 'action'

  actions:
    toggleWindow: ->
      throw "TODO: open window with list of actions"

    primaryAction: ->
      @.sendAction 'primaryAction.action'

`export default dropbutton`
