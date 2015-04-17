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
    # Prevents chrome from scrolling the page via momentum when scrolling the list
    @.$().bind('scroll.emberui', (e) =>
      scrollTop = $(window).scrollTop()

      Ember.run.next @, ->
        $(window).scrollTop(scrollTop)
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
