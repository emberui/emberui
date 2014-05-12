`import styleSupport from '../mixins/style-support'`
`import animationSupport from '../mixins/animation-support'`
`import popcalLayout from '../templates/eui-popcal'`

popcal = Em.Component.extend styleSupport, animationSupport,
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


  hide: ->
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
    @.$().position {
      my: "center top",
      at: "center bottom",
      of: @get('targetObject').$(),
      collision: 'flipfit'
    }

    # Bind to click event so we can close the popcal if the user clicks outside
    # it. Run next so popcal doesn't close immediately.
    Ember.run.next @, ->
      $(window).on 'click.emberui', (event) =>
        unless $(event.target).parents('.eui-popcal').length
          event.preventDefault()
          $(window).off(event)
          @hide()

    # Focus on popcal to ensure we can catch keyboard input.
    @.$().focus()

    # Add a class to the body element of the page so we can disable page
    # scrolling on mobile
    $('body').addClass('eui-popcal-open')

  ).on 'didInsertElement'


  breakdown: ->
    @get('previousFocus').focus()

    # Set status to closed
    @set 'isOpen', false

    # Remove class set on body to disable mobile scrolling
    $('body').removeClass('eui-popcal-open')

    # Update selection if it is valid
    unless @get('dateRange') and @get('_selection')?.get('length') is 1
      @set 'selection', @get '_selection'

    @destroy()


  actions:
    closeCalendar: ->
      dateRange = @get 'dateRange'
      selection = @get '_selection'

      if dateRange
        # Close if user has a complete date range selected
        if selection?.get('length') > 1
          @hide()

      # Close if single date mode and they have made a selection
      else if selection
        @hide()


  # Catch and handle key presses

  keyUp: (event) ->
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
