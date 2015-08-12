`import styleSupport from '../mixins/style-support'`
`import animationSupport from '../mixins/animation-support'`
`import popcalLayout from '../templates/components/eui-popcal'`
`import preventPageScroll from '../mixins/prevent-page-scroll'`
`import renderOnBody from '../mixins/render-on-body'`

`import '../utilities/position';`
`import '../animations/popcal-open-default'`
`import '../animations/popcal-close-default'`

popcal = Em.Component.extend styleSupport, animationSupport, preventPageScroll, renderOnBody,
  layout: popcalLayout
  classNames: ['eui-popcal']
  attributeBindings: ['tabindex']
  tagName: 'eui-popcal'

  animationClass: 'euiPopcal'


  # We don't really want to modal to be focusable, but we do need it to catch
  # all key presses

  tabindex: 0


  # If the popcal is opened using the keyboard then we use this value to
  # restore the focus where it was after the popcal closes.

  previousFocus: null


  hide: (attrs) ->
    this.sendAction('selectionDidChange', attrs.selection) if attrs?.selectionDidChange and attrs.selection

    @animateOut({
      target: @get('targetObject').$()
      complete: => @breakdown()
    })


  setup: (->
    @animateIn()

    @set 'previousFocus', $(document.activeElement)

    # Set status to open
    @set 'isOpen', true

    # Set user selection to internal selection
    @set '_selection', @get 'selection'

    # Positions calendar using fixed positioning
    @.$().find('.eui-component').position {
      my: "center top",
      at: "center bottom",
      of: @get('targetObject').$(),
      collision: 'flipfit'
    }

    # Focus on popcal to ensure we can catch keyboard input.
    @.$().focus()

    @disablePageScroll()
  ).on 'didInsertElement'


  breakdown: ->
    @get('previousFocus').focus()

    # Set status to closed
    @set 'isOpen', false

    @enablePageScroll()

    # Update selection if it is valid
    unless @get('dateRange') and @get('_selection')?.get('length') is 1
      @set 'selection', @get '_selection'


  actions:
    closeCalendar: ->
      dateRange = @get 'dateRange'
      selection = @get '_selection'

      if dateRange
        # Close if user has a complete date range selected
        if selection?.get('length') > 1
          @hide({ selectionDidChange: true, selection: selection })

      # Close if single date mode and they have made a selection
      else if selection
        @hide({ selectionDidChange: true, selection: selection })


    hidePopcal: ->
      @hide()


  # Catch and handle key presses

  keyUp: (event) ->
    # ESC
    if event.keyCode == 27
      @hide()


`export default popcal`
