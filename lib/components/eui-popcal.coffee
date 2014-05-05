`import styleSupport from '../mixins/style-support'`
`import animationsDidComplete from '../mixins/animations-did-complete'`
`import popcalLayout from '../templates/eui-popcal'`

popcal = Em.Component.extend styleSupport,
  layout: popcalLayout
  classNames: ['eui-popcal']
  attributeBindings: ['tabindex']
  tagName: 'eui-popcal'


  # We don't really want to modal to be focusable, but we do need it to catch
  # all key presses

  tabindex: 0


  # If the popcal is opened using the keyboard then we use this value to
  # restore the focus where it was after the popcal closes.

  previousFocus: null


  # Reset and remove Popcal from the DOM and unbind events bound during
  # initialization.

  hide: ->
    $(window).unbind('.emberui')

    @get('previousFocus').focus()

    # Remove class set on body to disable mobile scrolling
    $('body').removeClass('eui-popcal-open')

    # Reset selection if it is invalid
    if @get('dateRange') and @get('selection')?.get('length') is 1
      @resetSelection()

    # Animate Out
    @.$().velocity @get('closeAnimation'), {
      complete: => @destroy()
      target: @get('targetObject').$()
    }


  setup: (->
    @set 'previousFocus', $(document.activeElement)

    # Save current selection
    @set '_selection', @get 'selection'

    # Positions calendar using fixed positioning
    @.$().position {
      my: "center top",
      at: "center bottom",
      of: @get('targetObject').$(),
      collision: 'flipfit'
    }

    # Animate In
    @.$().velocity @get 'openAnimation'

    # Bind to click event so we can close the popcal if the user clicks outside
    # it. Run next so popcal doesn't close immediately.
    Ember.run.next @, -> $(window).bind 'click.emberui', (event) ->
      unless $(event.target).parents('.eui-popcal').length
        event.preventDefault()
        popcal.hide()

    # Focus on popcal to ensure we can catch keyboard input.
    @.$().focus()

    # Add a class to the body element of the page so we can disable page
    # scrolling on mobile
    $('body').addClass('eui-popcal-open')

  ).on 'didInsertElement'

  actions:
    closeCalendar: ->
      dateRange = @get 'dateRange'
      selection = @get 'selection'

      if dateRange
        # Close if user has a complete date range selected
        if selection?.get('length') > 1
          @hide()

      # Close if single date mode and they have made a selection
      else if selection
        @hide()


  # Undos changes user made to selection

  resetSelection: ->
    @set 'selection', @get '_selection'


  # Catch and handle key presses

  keyDown: (event) ->
    # ESC
    if event.keyCode == 27
      @hide()


popcal.reopenClass
  show: (options = {}) ->
    popcal = @.create options
    popcal.container = popcal.get 'targetObject.container'
    popcal.appendTo '.ember-application'
    popcal


`export default popcal`
