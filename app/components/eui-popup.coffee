`import styleSupport from 'appkit/mixins/style-support'`
`import popupLayout from 'appkit/templates/components/eui-popup'`

popup = Em.Component.extend styleSupport,
  layout: popupLayout
  classNames: ['eui-popup']

  options: null

  actions:
    closePopup: ->
      @hide()

    actionThenHide: (option) ->
      isSelect = @get('isSelect')
      action = option.get('action')

      if isSelect
        @set('selected', option)
      else
        @get('targetObject').triggerAction({action})

      @hide()

  hide: ->
    @set('isOpen', false)
    $(window).unbind('scroll.emberui')
    $(window).unbind('click.emberui')
    @destroy()

  didInsertElement: ->
    @set('isOpen', true)

  listView: Ember.ListView.extend
    height: '180'
    rowHeight: '20'
    classNames: ['eui-options']

    itemViewClass: Ember.ListItemView.extend
      classNames: ['eui-option']
      template: Ember.Handlebars.compile('<div {{action actionThenHide this}}>{{label}}</div>')

  isSelect: Em.computed ->
    return true if @get('selected') != undefined
  .property 'selected'

popup.reopenClass
  show: (options = {}) ->
    popup = @.create options
    popup.container = popup.get('targetObject.container')
    popup.appendTo '.ember-application'

    Ember.run.next this, -> @position(options.targetObject, popup)
    popup

  position: (targetObject, popup) ->
    element = targetObject.$()
    popupElement = popup.$()

    offset = element.offset()

    # set a reasonable min-width on the popup before we caclulate its actual size
    elementWidthMinusPopupPadding = element.width() - parseFloat(popupElement.css('paddingLeft')) - parseFloat(popupElement.css('paddingRight'))
    popupElement.css('min-width', elementWidthMinusPopupPadding)

    # calculate all the numbers needed to set positioning
    elementPositionTop = offset.top - element.scrollTop()
    elementPositionLeft = offset.left - element.scrollLeft()
    elementHeight = element.height()
    elementWidth = element.width()
    popupWidth = popupElement.width()
    popupHorizontalPadding = parseFloat(popupElement.css('paddingLeft')) + parseFloat(popupElement.css('paddingRight'))
    windowScrollTop = $(window).scrollTop()
    windowScrollLeft = $(window).scrollLeft()

    popupPositionTop = elementPositionTop + elementHeight  - windowScrollTop
    popupPositionLeft = elementPositionLeft + elementWidth - popupWidth - popupHorizontalPadding - windowScrollLeft

    popupElement.css('top', popupPositionTop)
    popupElement.css('left', popupPositionLeft)

    $(window).bind 'scroll.emberui', ->
      popup.hide()

    $(window).bind 'click.emberui', (event) ->
      unless $(event.target).parents('.eui-popup').length
        event.preventDefault()
        popup.hide()


`export default popup`
