`import styleSupport from 'appkit/mixins/style-support'`
`import popupLayout from 'appkit/templates/components/eui-popup'`

popup = Em.Component.extend styleSupport,
  layout: popupLayout
  classNames: ['eui-popup']
  attributeBindings: ['tabindex']

  labelPath: 'label'
  options: null
  listHeight: '80'
  listRowHeight: '20'

  selection: undefined # Option currently selected
  highlighted: undefined # Option currently highlighted

  action: undefined # Controls what happens if option is clicked. Select it or perform Action

  hide: ->
    @set('isOpen', false)
    $(window).unbind('scroll.emberui')
    $(window).unbind('click.emberui')
    @destroy()

  didInsertElement: ->
    @set('isOpen', true)

    # Bring focus to popup so it can listen to key events
    @.$().focus()

  updateListHeight: ->
    optionCount = @get('options.length')
    rowHeight = @get('listRowHeight')

    if optionCount <= 12
      @set('listHeight', (optionCount * rowHeight))
    else
      @set('listHeight', (10 * rowHeight))

  optionsLengthDidChange: (->
    @updateListHeight()
  ).observes 'options.length'


  # Keyboard controls

  # set tabindex so that popup responds to key events
  tabindex: -1

  KEY_MAP:
    27: 'escapePressed'
    13: 'enterPressed'
    38: 'upArrowPressed'
    40: 'downArrowPressed'

  keyDown: (event) ->
    keyMap = @get 'KEY_MAP'
    method = keyMap[event.keyCode]
    @get(method)?.apply(this, arguments) if method

  escapePressed: (event) ->
    @hide()

  enterPressed: (event) ->
    event = @get('event')

    if event == 'select'
      @set('selection', @get('highlighted'))

    else if event == 'action'
      action = @get('highlighted.action')
      @get('targetObject').triggerAction({action})

    @hide()

  downArrowPressed: (event) ->
    event.preventDefault() # Don't let the page scroll down
    @adjustHighlight(1)

  upArrowPressed: (event) ->
    event.preventDefault() # Don't let the page scroll down
    @adjustHighlight(-1)

  adjustHighlight: (indexAdjustment) ->
    highlighted = @get('highlighted')
    options = @get('options')

    newIndex = 0

    for option, index in options
      if option == highlighted
        newIndex = index + indexAdjustment

        # Don't let highlighted option get out of bounds
        if newIndex == options.get('length')
          newIndex--
        else if newIndex < 0
          newIndex = 0

        break

    return @set('highlighted', options[newIndex])


  # List View

  listView: Ember.ListView.extend
    classNames: ['eui-options']
    height: Ember.computed.alias 'controller.listHeight'
    rowHeight: Ember.computed.alias 'controller.listRowHeight'

    didInsertElement: ->
      @_super()

      # Prevents mouse scroll events from passing through to the div
      # behind the popup when listView is scrolled to the end. Fixes
      # the popup closing if you scroll too far down
      @.$().bind('mousewheel DOMMouseScroll', (e) =>
        e.preventDefault()
        scrollTo = @get('scrollTop')

        if e.type == 'mousewheel'
          scrollTo += (e.originalEvent.wheelDelta * -1)

        else if e.type == 'DOMMouseScroll'
          scrollTo += 40 * e.originalEvent.detail

        @scrollTo(scrollTo)
      )

    itemViewClass: Ember.ListItemView.extend
      classNames: ['eui-option']
      classNameBindings: ['isHighlighted:eui-hover', 'isSelected:eui-selected']
      template: Ember.Handlebars.compile('{{view.label}}')

      labelPath: Ember.computed.alias 'controller.labelPath'

      # creates Label property based on specified labelPath
      labelPathDidChange: Ember.observer ->
        labelPath = @get 'labelPath'
        Ember.defineProperty(this, 'label', Ember.computed.alias("content.#{labelPath}"))
        @notifyPropertyChange 'label'
      , 'content', 'labelPath'

      initializeLabelPath: (->
        @labelPathDidChange()
      ).on 'init'

      # TODO: Unsure why this is not done automatically. Without this @get('content') returns undefined.
      updateContext: (context) ->
        @_super context
        @set 'content', context

      isHighlighted: Ember.computed ->
        @get('controller.highlighted') is @get('content')
      .property 'controller.highlighted', 'content'

      isSelected: Ember.computed ->
        @get('controller.selection') is @get('content')
      .property 'controller.selection', 'content'

      click: ->
        option = @get('content')
        event = @get('controller.event')

        if event == 'select'
          @set('controller.selection', option)

        else if event == 'action'
          action = option.get('action')
          @get('controller.targetObject').triggerAction({action})

        @get('controller').hide()

      mouseEnter: ->
        @set 'controller.highlighted', @get('content')

      mouseLeave: ->
        @set 'controller.highlighted', undefined


popup.reopenClass
  show: (options = {}) ->
    popup = @.create options
    popup.container = popup.get('targetObject.container')
    popup.appendTo '.ember-application'

    popup.updateListHeight()

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
