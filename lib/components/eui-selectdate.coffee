`import disabledSupport from '../mixins/disabled-support'`
`import validationSupport from '../mixins/validation-support'`
`import animationsDidComplete from '../mixins/animations-did-complete'`
`import modalBehaviour from '../mixins/modal-behaviour'`

select = Em.Component.extend disabledSupport, validationSupport, animationsDidComplete, modalBehaviour,
  tagName: 'eui-selectdate'
  classNames: ['eui-selectdate']
  classNameBindings: ['isDisabled:eui-disabled', 'isPlaceholder::eui-placeholder', 'class']

  style: 'default'
  size: 'medium'

  allowMultiple: false


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
      @toggleProperty 'open'

    closeCalendar: ->
      allowMultiple = @get 'allowMultiple'
      selection = @get 'selection'

      if allowMultiple
        if selection and selection.get('length') > 1
          @hide()

      else if selection
        @hide()


  # If user clicks outside the calendar close it

  monitorClicks: (->
    if @get 'open'
      $(window).bind 'click.emberui', (event) =>
        unless $(event.target).parents('.eui-selectdate').length
          event.preventDefault()
          @send 'closeCalendar'

    else
      $(window).unbind 'click.emberui'

  ).observes 'open'


  # Positions calendar using fixed positioning

  updatePosition: (->
    if @get 'open'
      Ember.run.next @, -> @positionCalendar()
  ).observes 'open'

  positionCalendar: ->
    @.$().find('eui-calendar').position {
      my: "center top",
      at: "center bottom",
      of: @.$()
    }


  # Catch and handle key presses

  keyDown: (event) ->
    # ESC
    # TODO Reset value to value before
    if event.keyCode == 27
      @hide()

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
