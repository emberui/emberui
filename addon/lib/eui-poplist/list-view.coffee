`import ListView from 'ember-list-view/list-view'`
`import listItemView from '../eui-poplist/list-item-view'`

list = ListView.extend
  attributeBindings: ['role', 'tabindex']
  role: 'menu'
  tabindex: '-1'

  classNames: ['eui-options']
  height: Ember.computed.alias 'controller.listHeight'
  rowHeight: Ember.computed.alias 'controller.listRowHeight'

  setup: (->
    # Prevents mouse scroll events from passing through to the div
    # behind the poplist when listView is scrolled to the end.
    @.$().bind('mousewheel.emberui', (e) =>
      e.preventDefault()
      scrollTo = @get('scrollTop') + (e.originalEvent.wheelDelta * -1)

      @scrollTo(scrollTo)
    )

    # Firefox
    @.$().bind('DOMMouseScroll.emberui', (e) =>
      e.cancelBubble = true
    )
  ).on 'didInsertElement'

  breakdown: (->
    @.$().unbind('mousewheel.emberui DOMMouseScroll.emberui')
  ).on 'willDestroyElement'

  itemViewClass: listItemView


`export default list`
