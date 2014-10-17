`import disabledSupport from '../mixins/disabled-support'`
`import widthSupport from '../mixins/width-support'`
`import errorSupport from '../mixins/error-support'`
`import popcalComponent from '../components/eui-popcal'`

select = Em.Component.extend disabledSupport, errorSupport, widthSupport,
  tagName: 'eui-selectdate'
  classNames: ['eui-selectdate']
  classNameBindings: ['isDisabled:eui-disabled', 'isPlaceholder::eui-placeholder', 'class']

  style: 'default'
  size: 'medium'
  calendarStyle: 'default'

  popcalIsOpen: false

  dateRange: false


  # Settings used when formatting the date

  formatting: {
    yearFormat: "YYYY"
    monthFormat: "MMMM"
    dayFormat: "D"
  }


  # Return Unix Time stamp of selections

  value: Em.computed 'selection.@each', (key, value) ->
    selection = @get 'selection'

    # setter
    if arguments.length is 2
      unless value
        @set 'selection', value
        return value

      if Em.isArray value
        @set 'selection', value.map (v) -> moment(v)
      else
        @set 'selection', moment(value)

      value

    # getter
    else
      unless selection
        return if @get('dateRange') then [] else null

      if Em.isArray selection
          selection.map (date) -> date.format('X')
      else
        selection.format('X')


  # Make sure if a selection is passed in that we immediately calculate what the
  # value is

  calculateInitalValue: (->
    @notifyPropertyChange 'value'
  ).on 'didInsertElement'


  # We have to calculate if there is no selection manually because [] will
  # evaluate to true and prevent a multi select from adding the placeholder
  # class

  isPlaceholder: Em.computed 'selection', ->
    selection = @get 'selection'

    if selection and Em.isArray(selection) and selection.get('length') is 0
      return false

    unless selection
      return false

    return true


  actions:
    openCalendar: ->
      unless @get 'popcalIsOpen'
        popcalComponent.show
          targetObject: @
          isOpenBinding: 'targetObject.popcalIsOpen'
          selectionBinding: 'targetObject.selection'
          dateRangeBinding: 'targetObject.dateRange'
          disablePastBinding: 'targetObject.disablePast'
          disableFutureBinding: 'targetObject.disableFuture'
          maxPastDateBinding: 'targetObject.maxPastDate'
          maxFutureDateBinding: 'targetObject.maxFutureDate'
          disabledDatesBinding: 'targetObject.disabledDates'
          styleBinding: 'targetObject.calendarStyle'
          animationStyle: @get 'animationStyle'


  # Catch and handle key presses

  keyUp: (event) ->
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

        # If they are in the middle of selecting a date range we want to only
        # show the first date
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


  # Error check should happen without user having to focus on component

  isEntered: true


`export default select`
