`import disabledSupport from '../mixins/disabled-support'`
`import widthSupport from '../mixins/width-support'`
`import validationSupport from '../mixins/validation-support'`
`import animationsDidComplete from '../mixins/animations-did-complete'`
`import modalBehaviour from '../mixins/modal-behaviour'`

select = Em.Component.extend disabledSupport, validationSupport, animationsDidComplete, modalBehaviour, widthSupport,
  tagName: 'eui-selectdate'
  classNames: ['eui-selectdate']
  classNameBindings: ['isDisabled:eui-disabled', 'isPlaceholder::eui-placeholder', 'class']

  style: 'default'
  size: 'medium'

  dateRange: false


  # Settings used when formatting the date

  formatting: {
    yearFormat: "YYYY"
    monthFormat: "MMMM"
    dayFormat: "D"
  }


  # We have to calculate if there is no selection manually because [] will evaluate to true
  # and prevent a multi select from adding the placeholder class

  isPlaceholder: Em.computed 'selection', ->
    selection = @get 'selection'

    if selection and Em.isArray(selection) and selection.get('length') is 0
      return false

    unless selection
      return false

    return true


  actions:
    toggleCalendar: ->
       if @get('open') then @send('closeCalendar') else @send('openCalendar')


    closeCalendar: (options) ->
      dateRange = @get 'dateRange'
      selection = @get 'selection'

      closeCalendar = false

      if dateRange
        # Close if user has date range selected
        if selection and selection.get('length') > 1
          closeCalendar = true

        # Close if part of date range is selected, but user pressed ESC. Reset selection.
        else if selection and selection.get('length') is 1 and options and options.forceClose is true
          @resetSelection()
          closeCalendar = true

        # Close if nothing is selected and user presses ESC
        else if selection.get('length') is 0 and options and options.forceClose is true
          closeCalendar = true

      # Close if single date mode and they have made a selection
      else if selection
        closeCalendar = true

      # Close if we have set forceClose for any reason
      else if options and options.forceClose is true
        closeCalendar = true

      if closeCalendar
        $(window).unbind 'click.emberui'
        @hide()


    openCalendar: ->
      # Show calendar
      @set 'open', true

      # Position calendar
      Ember.run.next @, -> @positionCalendar()

      # Save current selection
      @set '_selection', @get 'selection'

      # Bind click so we can close calendar is user clicks outside it
      $(window).bind 'click.emberui', (event) =>
        unless @.$().find($(event.target)).length
          event.preventDefault()
          @send 'closeCalendar', {forceClose: true}


  # Positions calendar using fixed positioning

  positionCalendar: ->
    @.$().find('eui-calendar').position {
      my: "center top",
      at: "center bottom",
      of: @.$(),
      collision: 'flipfit'
    }


  # Undos changes user made to selection

  resetSelection: ->
    @set 'selection', @get '_selection'


  # Catch and handle key presses

  keyDown: (event) ->
    # ESC
    if event.keyCode == 27
      @send 'closeCalendar', {forceClose: true}

    # Down Arrow
    if event.which == 40
      event.preventDefault()
      @send 'toggleCalendar'


  # Label of the selected date or the placeholder text

  label: Em.computed 'selection.@each', 'placeholder', ->
    selection = @get 'selection'
    label = null

    if selection
      # Date Range
      if Em.isArray(selection)

        # If they are in the middle of selecting a date range we want to only show the first date
        if selection.get('length') < 2
          startDate = selection.get('firstObject')

          label = @formatDateRange startDate

        else
          startDate = selection.get('firstObject')
          endDate = selection.get('lastObject')

          label = @formatDateRange startDate, endDate

      # Single Date
      else
        label = @formatDate(selection)

    return label || @get 'placeholder'


  # Formats a single date

  formatDate: (date) ->
    return unless date
    return date.twix(date, true).format(@get 'formatting')


  # Format a date range

  formatDateRange: (startDate, endDate) ->
    return unless startDate

    formatting = @get 'formatting'

    # No end date is selected so show partial date
    unless endDate
      return startDate.twix(startDate, true).format(formatting) + ' -'

    # Full date range
    if startDate and endDate

      if endDate.isBefore startDate
        return endDate.twix(startDate, true).format formatting

      else
        return startDate.twix(endDate, true).format formatting


  # Overide validation-support mixin to check validation on change even if no error
  # This is needed because the select will not receive the blur event when the user
  # select and option

  onChange:  (->
    Ember.run.once @, 'validateField'
  ).observes 'value'

`export default select`
