`import styleSupport from '../mixins/style-support'`
`import animationSupport from '../mixins/animation-support'`
`import poplistLayout from '../templates/eui-poplist'`
`import itemViewClassTemplate from '../templates/eui-poplist-option'`

poplist = Em.Component.extend styleSupport, animationSupport,
  layout: poplistLayout
  classNames: ['eui-poplist']
  classNameBindings: ['isOpen::eui-closing']
  attributeBindings: ['tabindex']
  tagName: 'eui-poplist'

  animationClass: 'euiPoplist'


  # Width of the poplist. Because list-view uses absolute positioning we can not
  # rely on the content to push the poplist wider so the user needs a way to
  # specify it

  listWidth: null


  # Controls the vertical height and row height for the list-view component

  listHeight: '80'
  listRowHeight: '20'


  # Path to the string that should be used as the label

  labelPath: 'label'


  # Options user should select from

  options: null


  # String the user wants to filter by

  searchString: null


  # Index of option currently highlighted

  highlightedIndex: -1


  # If the poplist is opened using the keyboard then we use this value to
  # restore the focus where it was after the poplist closes.

  previousFocus: null


  # Option that is currently highlighted

  highlighted: Ember.computed 'highlightedIndex', 'filteredOptions', (key, value) ->
    options = @get 'filteredOptions'

    # setter
    if arguments.length is 2
      index = options.indexOf value
      @set 'highlightedIndex', index
      value

    # getter
    else
      index = @get 'highlightedIndex'
      options.objectAt index


  hide: ->
    @animateOut({
      target: @get('targetObject').$()
      complete: => @breakdown()
    })


  setup: (->
    @setPoplistWidth()

    # Positions calendar using fixed positioning
    Em.run.next @, -> @.$().position {
      my: "right top",
      at: "right bottom",
      of: @get('targetObject').$(),
      collision: 'flipfit'
    }

    @animateIn()

    @set 'isOpen', true
    @set 'previousFocus', $(document.activeElement)

    # Focus on search input to ensure we can catch keyboard input. Do this after
    # the poplist is positioned to ensure it is visible. Failure to do so will
    # result in the page scrolling and closing the poplist
    Ember.run.next this, -> @focusOnSearch()

    # Set poplist width
    @updateListWidthCss()

    # Ensure the selected option is visible and center it
    Ember.run.next this, -> @scrollToSelection @get('options').indexOf(@get 'selection'), true

    # Add a class to the body element of the page so we can disable page
    # scrolling on mobile
    $('body').addClass('eui-poplist-open')

    # Bind to click event so we can close the poplist if the user click outside
    # it
    Ember.run.next @, ->
      $(window).on 'click.emberui', (event) =>
        unless $(event.target).parents('.eui-poplist').length
          event.preventDefault()
          $(window).off(event)
          @hide()

  ).on 'didInsertElement'


  breakdown: ->
    @setProperties { isOpen: false, highlightedIndex: -1 }

    @get('previousFocus').focus()

    # Remove class set on body to disable mobile scrolling
    $('body').removeClass('eui-poplist-open')

    @destroy()


  # Set poplist width to the user specified width, but enforce a min width of
  # the parent button

  setPoplistWidth: ->
    element = @get('targetObject').$()
    poplistElement = @.$()

    elementWidthMinuspoplistPadding =
      element.width() -
      parseFloat(poplistElement.css('paddingLeft')) -
      parseFloat(poplistElement.css('paddingRight'))

    poplistElement.css('min-width', elementWidthMinuspoplistPadding)


  # Focuses on search input so we can catch key input

  focusOnSearch: ->
    @$().find('input:first').focus()


  # Because we are manually setting other css on the element we can't use
  # bindings to update it automatically and have to do so manually

  updateListWidthCss: ->
    listWidth = @get 'listWidth'
    @.$().css 'width', listWidth


  # Set the selection back to the first option if the users changes the search
  # query
  # TODO: This doesn't fire the bindings on the listView correctly and you end
  # up with multiple items highlighted.

  searchStringDidChange: (->
    @set 'highlightedIndex', 0 if @get 'searchString'
  ).observes 'searchString'


  # Filter the option list based on the query entered into the search box

  filteredOptions: (->
    options = @get 'options'
    query = @get 'searchString'

    return [] unless options
    return options unless query

    labelPath = @get 'labelPath'

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
    optionCount = @get 'filteredOptions.length'
    rowHeight = @get 'listRowHeight'

    if optionCount <= 12
      @set 'listHeight', optionCount * rowHeight
    else
      @set 'listHeight', 10 * rowHeight


  # Scroll the list to make sure the given option is visible.
  # Copied from https://github.com/Addepar/ember-widgets/

  scrollToSelection: (index, center) ->
    $listView  = @.$('.ember-list-view')
    listView   = Ember.View.views[$listView.attr('id')]
    startIndex = listView._startingIndex()
    numRows    = listView._childViewCount() - 1
    endIndex   = startIndex + numRows

    if index is 0
      $listView.scrollTop 0
    else if index < startIndex
      $listView.scrollTop index * @get 'listRowHeight'
    else if index >= endIndex
      if center
        $listView.scrollTop (index - (numRows / 2)) * @get 'listRowHeight'
      else
        $listView.scrollTop (index - numRows + 1) * @get 'listRowHeight'


  # Keyboard controls

  KEY_MAP:
    27: 'escapePressed'
    13: 'enterPressed'
    38: 'upArrowPressed'
    40: 'downArrowPressed'


  keyUp: (event) ->
    keyMap = @get 'KEY_MAP'
    method = keyMap[event.which]
    @get(method)?.apply(this, arguments) if method


  escapePressed: (event) ->
    @hide()


  enterPressed: (event) ->
    event.preventDefault()
    @set 'selection', @get 'highlighted'
    @hide()


  downArrowPressed: (event) ->
    event.preventDefault() # Don't let the page scroll down
    @adjustHighlight(1)


  upArrowPressed: (event) ->
    event.preventDefault() # Don't let the page scroll down
    @adjustHighlight(-1)


  # Method to highlight the next or previous item in the list. It will ensure
  # that at least one item remains highlighted

  adjustHighlight: (indexAdjustment) ->
    highlightedIndex = @get 'highlightedIndex'
    options = @get 'filteredOptions'
    optionsLength = options.get 'length'
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

    # Make sure the current option is visible
    @scrollToSelection(newIndex)

    @set 'highlightedIndex', newIndex


  # List View

  listView: Ember.ListView.extend
    # Overriding this temporarily to fix the scrollbars in Firefox
    # Remove once https://github.com/emberjs/list-view/pull/113 is integrated
    css:
      position: 'relative'
      overflow: 'auto'
      '-webkit-overflow-scrolling': 'touch'
      'overflow-scrolling': 'touch'

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


    itemViewClass: Ember.ListItemView.extend
      classNames: ['eui-option']
      classNameBindings: ['isHighlighted:eui-hover', 'isSelected:eui-selected']
      template: itemViewClassTemplate


      # creates Label property based on specified labelPath

      labelPathDidChange: (->
        labelPath = @get 'controller.labelPath'
        Ember.defineProperty(this, 'label', Ember.computed.alias("content.#{labelPath}"))
        @notifyPropertyChange 'label'
      ).observes 'content', 'controller.labelPath'


      initializeLabelPath: (->
        @labelPathDidChange()
      ).on 'init'


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


poplist.reopenClass
  show: (options = {}) ->
    poplist = @.create options
    poplist.container = poplist.get 'targetObject.container'
    poplist.appendTo '.ember-application'

    poplist.updateListHeight()
    poplist


`export default poplist`
