`import ListItemView from 'ember-list-view/list-item-view'`
`import itemViewClassTemplate from '../../templates/components/eui-poplist-option'`

listItem = ListItemView.extend
  classNames: ['eui-option']
  classNameBindings: ['isHighlighted:eui-hover', 'isSelected:eui-selected']
  template: itemViewClassTemplate
  attributeBindings: ['role', 'tabindex']
  role: 'menuitem'
  tabindex: '0'

  isHighlightedDidChange: Ember.observer 'isHighlighted', ->
    # Focussing the highlighted item is necessary for screen readers to work.
    #
    # Calling focus immediately is expensive. When holding up/down a arrow keys,
    # this actually causes the highlighted option to lag outside of the scrolled
    # portion of the list. Performance is maintained by placing it in the next run loop.

    Ember.run.next =>
      @.$().focus() if @get('isHighlighted') and @.$()

  setup: Ember.on 'init', ->
    @isHighlightedDidChange()
    @labelPathDidChange()

  # creates Label property based on specified labelPath

  labelPathDidChange: Ember.observer 'content', 'controller.labelPath', ->
    labelPath = @get 'controller.labelPath'
    Ember.defineProperty(this, 'label', Ember.computed.alias("content.#{labelPath}"))
    @notifyPropertyChange 'label'

  # Bindings won't fire if bound to context

  updateContext: (context) ->
    @_super context
    @set 'content', context


  isHighlighted: Ember.computed 'controller.highlighted', 'content', ->
    @get('controller.highlighted') is @get('content')


  isSelected: Ember.computed 'controller.selection', 'content', ->
    @get('controller.selection') is @get('content')


  click: ->
    @set 'controller.selection', @get 'content'
    @get('controller').hide()


  mouseEnter: ->
    options = @get 'controller.filteredOptions'
    hoveredOption = @get 'content'
    @set 'controller.highlighted', hoveredOption


`export default listItem`
