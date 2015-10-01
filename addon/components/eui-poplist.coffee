`import className from '../mixins/class-name'`
`import animationSupport from '../mixins/animation-support'`
`import mobileDetection from '../mixins/mobile-detection'`
`import preventPageScroll from '../mixins/prevent-page-scroll'`
`import renderOnBody from '../mixins/render-on-body'`
`import poplistLayout from '../templates/components/eui-poplist'`
`import listView from '../lib/eui-poplist/list-view'`

`import '../utilities/position';`
`import '../animations/poplist-open-default'`
`import '../animations/poplist-close-default'`
`import '../animations/poplist-open-flyin'`
`import '../animations/poplist-close-flyin'`


poplist = Em.Component.extend className, animationSupport, mobileDetection, preventPageScroll, renderOnBody,
  layout: poplistLayout
  classNames: ['eui-poplist']
  classNameBindings: ['isOpen::eui-closing', 'isMobileDevice:eui-touch']
  tagName: 'eui-poplist'

  baseClass: 'poplist'
  style: 'default'

  animationClass: 'euiPoplist'


  # Width of the poplist. Because list-view uses absolute positioning we can not
  # rely on the content to push the poplist wider so the user needs a way to
  # specify it

  listWidth: null


  # Controls the vertical height and row height for the list-view component

  listHeight: Ember.computed 'filteredOptions.length', ->
    optionCount = @get 'filteredOptions.length'
    rowHeight = @get 'listRowHeight'

    if optionCount <= 12
      return optionCount * rowHeight
    else
      return 10 * rowHeight


  listRowHeight: Ember.computed 'isMobileDevice', ->
    if @get 'isMobileDevice' then return '30' else return '20'


  # Controls whether poplist should be a modal if opened on a mobile device

  modalOnMobile: false


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

  highlighted: Ember.computed 'highlightedIndex', 'filteredOptions',
    get: (key) ->
      options = @get 'filteredOptions'
      index = @get 'highlightedIndex'
      options[index]

    set: (key, value) ->
      options = @get 'filteredOptions'
      index = options.indexOf value
      @set 'highlightedIndex', index
      value


  hide: ->
    @animateOut({
      target: @get('targetObject').$()
      complete: => @breakdown()
    })

  setup: Ember.on 'didInsertElement', ->
    @setPoplistMinWidth()

    component = @.$().find('.eui-component')

    # Positions calendar using fixed positioning
    if @get('isMobileDevice') && @get('modalOnMobile')
      Em.run.next @, -> component.position {
        my: "center center",
        at: "center center",
        of: $(window)
      }
    else
      Em.run.next @, -> component.position {
        my: "right top",
        at: "right bottom",
        of: @get('targetObject').$(),
        collision: 'flipfit'
      }

    @animateIn()

    @set 'isOpen', true
    @set 'previousFocus', $(document.activeElement)

    # Focus on search input to ensure we can catch keyboard input. Do this after
    # the poplist is positioned to ensure it is visible. Don't do this on
    # mobile because old android versions will open up the keyboard.
    unless @get 'isMobileDevice'
      Ember.run.next this, -> @focusOnSearch()

    # Set poplist width
    @updateListWidthCss()

    # Ensure the selected option is visible and center it
    Ember.run.next this, -> @scrollToSelection @get('options').indexOf(@get 'selection'), true

    @disablePageScroll()


  breakdown: ->
    @setProperties { isOpen: false, highlightedIndex: -1 }

    @get('previousFocus').focus()

    @enablePageScroll()


  # Set poplist width to the user specified width, but enforce a min width of
  # the parent button

  setPoplistMinWidth: ->
    element = @get('targetObject').$()
    poplistElement = @.$().find('.eui-component')

    elementWidthMinuspoplistPadding =
      element.width() -
      parseFloat(poplistElement.css('paddingLeft')) -
      parseFloat(poplistElement.css('paddingRight'))

    poplistElement.css('min-width', elementWidthMinuspoplistPadding)


  # Because we are manually setting other css on the element we can't use
  # bindings to update it automatically and have to do so manually

  updateListWidthCss: ->
    component = @.$().find('.eui-component')

    if @get('isMobileDevice') && @get('modalOnMobile')
      component.css 'width', '80%'
    else
      listWidth = @get 'listWidth'
      component.css 'width', listWidth


  # Focuses on search input so we can catch key input

  focusOnSearch: ->
    @$().find('input:first').focus()


  # Set the selection back to the first option if the users changes the search
  # query
  # TODO: This doesn't fire the bindings on the listView correctly and you end
  # up with multiple items highlighted.

  searchStringDidChange: Ember.observer 'searchString', ->
    @set 'highlightedIndex', 0 if @get 'searchString'


  # Filter the option list based on the query entered into the search box

  filteredOptions: Ember.computed 'options.@each', 'labelPath', 'searchString', ->
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


  hasNoOptions: Ember.computed.empty 'filteredOptions'


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


  keyDown: (event) ->
    keyMap = @get 'KEY_MAP'
    method = keyMap[event.which]
    # Execute if found in KeyMap - otherwise send focus back to search.
    # This is necessary because we send focus to highlighted elements, and
    # always highlight the first filtered option after the search value changes
    if method
      @get(method)?.apply(this, arguments)
    else
      @focusOnSearch()

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


  actions:
    hidePoplist: ->
      @hide()


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


  listView: listView


`export default poplist`
