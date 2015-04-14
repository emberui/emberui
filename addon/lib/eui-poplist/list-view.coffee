`import ListView from 'ember-list-view/list-view'`
`import listItemView from '../eui-poplist/list-item-view'`

list = ListView.extend
  attributeBindings: ['role', 'tabindex']
  role: 'menu'
  tabindex: '-1'

  css:
    position: 'relative'
    '-webkit-overflow-scrolling': 'touch'
    'overflow-scrolling': 'touch'
    overflow: 'auto'

  classNames: ['eui-options']
  height: Ember.computed.alias 'controller.listHeight'
  rowHeight: Ember.computed.alias 'controller.listRowHeight'

  setup: (->
    # Prevents mouse scroll events from passing through to the div
    # behind the poplist when listView is scrolled to the end. Fixes
    # the poplist closing if you scroll too far down
    @.$().bind('mousewheel.emberui DOMMouseScroll.emberui', (e) =>
      e.preventDefault()
      scrollTo = @get 'scrollTop'

      if e.type == 'mousewheel'
        scrollTo += (e.originalEvent.wheelDelta * -1)

      else if e.type == 'DOMMouseScroll'
        scrollTo += 40 * e.originalEvent.detail

      @scrollTo(scrollTo)
    )
  ).on 'didInsertElement'

  itemViewClass: listItemView


`export default list`
