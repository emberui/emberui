preventPageScroll = Em.Mixin.create
  # Prevent scrolling while poplist is open. We have to use a hack with eui-enabled
  # to move the scroller off-screen so we can crop out the scrollbars that is visible.
  # If we do it when we show it osx shows the scrollbars regardless.
  disablePageScroll: ->
    net = @.$().find('.eui-scroller--net')

    net.scrollTop(5000).scrollLeft(5000).addClass('eui-enabled')

    net.scroll ->
      $(@).scrollTop(5000).scrollLeft(5000)


  enablePageScroll: ->
    @.$().find('.eui-scroller--net').unbind('scroll')


`export default preventPageScroll`
