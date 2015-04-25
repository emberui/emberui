`import ListView from 'ember-list-view/list-view'`
`import listItemView from '../eui-poplist/list-item-view'`

list = ListView.extend
  attributeBindings: ['role', 'tabindex']
  role: 'menu'
  tabindex: '-1'

  classNames: ['eui-options']
  height: Ember.computed.alias 'controller.listHeight'
  rowHeight: Ember.computed.alias 'controller.listRowHeight'

  windowScrollPosition: 0

  setup: (->
    @set('windowScrollPosition', $(window).scrollTop())

    $(window).on('scroll.emberui', (e) =>
      $(window).scrollTop(@get('windowScrollPosition'))
    )

    @.$().on('wheel.emberui', (e) =>
      e.preventDefault()
      scrollTop = @.$().scrollTop()
      momentum =  e.originalEvent.deltaY

      unless scrollTop is @.$().height() - @.$().find('.ember-list-container').height()
        @.$().scrollTop(scrollTop + momentum)
    )
  ).on 'didInsertElement'

  breakdown: (->
    @.$().off('wheel.emberui')
    $(window).off('scroll.emberui')
  ).on 'willDestroyElement'

  itemViewClass: listItemView


`export default list`
