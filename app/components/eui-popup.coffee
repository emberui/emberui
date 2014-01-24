`import styleSupport from 'appkit/mixins/style-support'`
`import popupLayout from 'appkit/templates/components/eui-popup'`

popup = Em.Component.extend styleSupport,
  layout: popupLayout
  classNames: ['eui-popup']

  actions:
    closePopup: ->
      @hide()

    actionThenHide: (action) ->
      @triggerAction {action: action, actionContext: @get('parent')}
      @hide()

  hide: ->
    @set('isOpen', false)
    $(window).unbind('scroll.emberui')
    @destroy()

  didInsertElement: ->
    @set('isOpen', true)
    _this = @

    $(window).bind 'scroll.emberui', ->
      _this.hide()


popup.reopenClass
  show: (options = {}) ->
    popup = this.create options
    popup.appendTo 'body'

    Ember.run.next this, -> @position(options.parent, popup)
    popup

  position: (parent, popup) ->
    element = parent.$()
    popup = popup.$().find('.eui-window')

    offset = element.offset()

    # set a reasonable min-width on the popup before we caclulate its actual size
    elementWidthMinusPopupPadding = element.width() - parseFloat(popup.css('paddingLeft')) - parseFloat(popup.css('paddingRight'))
    popup.css('min-width', elementWidthMinusPopupPadding)

    # calculate all the numbers needed to set positioning
    elementPositionTop = offset.top - element.scrollTop()
    elementPositionLeft = offset.left - element.scrollLeft()
    elementHeight = element.height()
    elementWidth = element.width()
    popupWidth = popup.width()
    popupHorizontalPadding = parseFloat(popup.css('paddingLeft')) + parseFloat(popup.css('paddingRight'))
    windowScrollTop = $(window).scrollTop()
    windowScrollLeft = $(window).scrollLeft()

    popupPositionTop = elementPositionTop + elementHeight  - windowScrollTop
    popupPositionLeft = elementPositionLeft + elementWidth - popupWidth - popupHorizontalPadding - windowScrollLeft

    popup.css('top', popupPositionTop)
    popup.css('left', popupPositionLeft)


`export default popup`
