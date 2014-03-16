`import styleSupport from 'appkit/mixins/style-support'`
`import popupLayout from 'appkit/templates/components/eui-popup'`
`import itemViewClassTemplate from 'appkit/templates/components/eui-popup-option'`

popup = Em.Component.extend styleSupport,
  layout: popupLayout
  classNames: ['eui-popup']
  classNameBindings: ['isOpen::eui-closing']
  attributeBindings: ['tabindex']

  labelPath: 'label'
  options: null
  listHeight: '80'
  listRowHeight: '20'
  searchString: null

  highlightedIndex: -1 # Option currently highlighted

  previousFocus: null # Where the user's focus was before the popup was opened (only for keyboard nav)

  highlightedOption: (->
    options = @get('filteredOptions')
    index = @get('highlightedIndex')
    options[index]
  ).property 'highlightedIndex', 'filteredOptions'

  hide: ->
    @set('isOpen', false).set('highlightedIndex', -1)
    $(window).unbind('scroll.emberui')
    $(window).unbind('click.emberui')
    @get('previousFocus').focus()

    # Wait for any closing animation to finish before we remove it from the DOM
    # TODO: Remove from DOM event is no closing animation
    @$().one 'webkitAnimationEnd oanimationend msAnimationEnd animationend', =>
      @destroy()

  didInsertElement: ->
    @set('isOpen', true)
    @set('previousFocus', $("*:focus"))

    # Focus on search after popup is positioned or the page may scroll
    Ember.run.next this, -> @focusOnSearch()

  # Focus on search input when popup shows so we can catch key input
  focusOnSearch: ->
    @$().find('input:first').focus()

  # Set the selection back to the first option if the users changes the search query
  searchStringDidChange: (->
    @set('highlightedIndex', 0) if @get('searchString')
  ).observes 'searchString'

  # Filter the option list based on the query entered into the search box
  filteredOptions: (->
    options = @get('options')
    query = @get('searchString')

    return [] unless options
    return options unless query

    labelPath = @get('labelPath')

    escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    regex = new RegExp(escapedQuery, 'i')

    filteredOptions = options.filter (item, index, self) ->
      label = item.get?(labelPath) or item[labelPath]
      regex.test(label) if label

    return filteredOptions
  ).property 'options.@each', 'labelPath', 'searchString'

  hasNoOptions: Ember.computed.empty 'filteredOptions'

  # Updates the list-view's height based on the number of options
  optionsLengthDidChange: (->
    @updateListHeight()
  ).observes 'filteredOptions.length'

  updateListHeight: ->
    optionCount = @get('filteredOptions.length')
    rowHeight = @get('listRowHeight')

    if optionCount <= 12
      @set('listHeight', (optionCount * rowHeight))
    else
      @set('listHeight', (10 * rowHeight))


  # Keyboard controls

  KEY_MAP:
    27: 'escapePressed'
    13: 'enterPressed'
    38: 'upArrowPressed'
    40: 'downArrowPressed'

  keyDown: (event) ->
    keyMap = @get 'KEY_MAP'
    method = keyMap[event.which]
    @get(method)?.apply(this, arguments) if method

  escapePressed: (event) ->
    @hide()

  enterPressed: (event) ->
    event.preventDefault()
    @set('selection', @get('highlightedOption'))
    @hide()

  downArrowPressed: (event) ->
    event.preventDefault() # Don't let the page scroll down
    @adjustHighlight(1)

  upArrowPressed: (event) ->
    event.preventDefault() # Don't let the page scroll down
    @adjustHighlight(-1)


  adjustHighlight: (indexAdjustment) ->
    highlightedIndex = @get('highlightedIndex')
    options = @get('filteredOptions')
    optionsLength = options.get('length')
    newIndex

    # If the current index is out of bounds they searched
    # so we adjust it back in
    if highlightedIndex >= optionsLength
      newIndex = 0 if indexAdjustment == 1

    else
      newIndex = highlightedIndex + indexAdjustment

      # Don't let highlighted option get out of bounds
      if newIndex >= optionsLength
        newIndex = optionsLength - 1

      else if newIndex < 0
        newIndex = 0

    return @set('highlightedIndex', newIndex)


  # List View

  listView: Ember.ListView.extend
    # Overriding this temporarily to fix the scrollbars in Firefox
    css:
      position: 'relative'
      overflow: 'auto'
      '-webkit-overflow-scrolling': 'touch'
      'overflow-scrolling': 'touch'

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
      template: itemViewClassTemplate

      labelPath: Ember.computed.alias 'controller.labelPath'
      highlightedIndex: Ember.computed.alias 'controller.highlightedIndex'
      highlightedOption: Ember.computed.alias 'controller.highlightedOption'
      selection: Ember.computed.alias 'controller.selection'
      filteredOptions: Ember.computed.alias 'controller.filteredOptions'
      event: Ember.computed.alias 'controller.event'

      # creates Label property based on specified labelPath
      labelPathDidChange: (->
        labelPath = @get 'labelPath'
        Ember.defineProperty(this, 'label', Ember.computed.alias("context.#{labelPath}"))
        @notifyPropertyChange 'label'
      ).observes 'content', 'labelPath'

      initializeLabelPath: (->
        @labelPathDidChange()
      ).on 'init'

      # Bindings won't fire if bound to context
      updateContext: (context) ->
        @_super context
        @set 'content', context

      isHighlighted: Ember.computed ->
        @get('highlightedOption') is @get('context')
      .property 'highlightedOption', 'content'

      isSelected: Ember.computed ->
        @get('selection') is @get('context')
      .property 'selection', 'content'

      # Set selection or execute action depending on event type
      click: ->
        @set('selection', @get('context'))
        @get('controller').hide()

      mouseEnter: ->
        options = @get('filteredOptions')
        hoveredOption = @get('context')

        for option, index in options
          if option == hoveredOption
            @set 'highlightedIndex', index
            break


popup.reopenClass
  show: (options = {}) ->
    popup = @.create options
    popup.container = popup.get('targetObject.container')
    popup.appendTo '.ember-application'

    popup.updateListHeight()

    Ember.run.next this, -> @position(options.targetObject, popup)
    popup

  # TODO: Rewrite as reusable position function
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
