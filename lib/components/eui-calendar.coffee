`import styleSupport from '../mixins/style-support'`

cpFormatMoment = (key, format) ->
  return Em.computed( ->
    date = @get(key)
    return if date then date.format(format) else null
  ).property(key)


calendar = Em.Component.extend styleSupport,
  tagName: 'eui-calendar'
  classNames: 'eui-calendar'

  showNextMonth:       true
  showPrevMonth:       false

  disabledDates:       null
  disablePast:         null
  disableFuture:       null
  disableManipulation: null

  maxPastDate:         null
  maxFutureDate:       null

  month:               null

  allowMultiple:       false
  forceContinuousSelection: true
  _selection:          []

  init: ->
    @_super()

    Ember.warn(
      'EUI-CALENDAR: You have passed in multiple dates without allowing for mulitple date _selection',
      !(@get('_selection.length') > 1 && !@get('allowMultiple'))
    )

    firstSelectedDate = @get '_selection.firstObject'

    if not @get('month') and firstSelectedDate
      @set 'month', firstSelectedDate.clone().startOf('month')

    unless @get 'month'
      @set 'month', moment().startOf('month')


  actions:
    dateSelected: (date) ->
      @sendAction 'selectAction', date

      if @get 'disableManipulation'
        return

      if @get 'allowMultiple'
        if @get 'forceContinuousSelection'

          # User is finishing a selection
          if @get('_selection.length') is 1

            # If user clicked same date as the first one they probably mean to restart their selection
            if date.isSame @get '_selection.firstObject'
              @set '_selection', []
            else
              @addDateRange @get('_selection.firstObject'), date

          # User is starting a new selection
          else
            @set '_selection', [date]

        else
          if @hasDate(date)
            @removeDate(date)
          else
            @addDate(date)

      else
        if @hasDate(date)
          @set '_selection', []
        else
          @set '_selection', [date]


    prev: ->
      month = @get 'month'

      if !month || @get 'isPrevDisabled'
        return

      @set 'month', month.clone().subtract('months', 1)


    next: ->
      month = @get 'month'

      if !month || @get 'isNextDisabled'
        return

      @set 'month', month.clone().add('months', 1)


  selection: Ember.computed (key, value) ->
    # setter
    if arguments.length is 2
      if @get 'allowMultiple'
        if Ember.isArray(value)
          @set '_selection', value

        else
          @set '_selection', [value]

      value

    # getter
    else
      selection = @get('_selection')

      if @get 'allowMultiple'
        return selection

      else
        return selection.get('firstObject')
  .property '_selection'


  hasDate: (date) ->
    return @get('_selection').any (d) ->
      return d.isSame(date)


  removeDate: (date) ->
    dates = @get '_selection'

    removeDates = dates.filter (d) ->
      return d.isSame(date)

    dates.removeObjects(removeDates)


  addDate: (date) ->
    @removeDate date
    @get('_selection').pushObject(date)


  addDateRange: (startDate, endDate) ->
    day = moment(startDate)

    # User clicked on a day BEFORE the current selected day
    if endDate.isBefore startDate
      day.subtract 'days', 1

      while not day.isBefore endDate
        @addDate(moment day)
        day.subtract 'days', 1

    # User clicked on a day AFTER the current selected day
    else
      day.add 'days', 1

      while not day.isAfter endDate
        @addDate(moment day)
        day.add 'days', 1

  # TODO: Add timer to invalidate this
  now: (->
    return moment()
  ).property()


  prevMonth: (->
    month = @get 'month'
    return if month then month.clone().subtract('months', 1) else null
  ).property 'month'


  nextMonth: (->
    month = @get 'month'
    return if month then month.clone().add('months', 1) else null
  ).property 'month'


  isNextMonthInFuture: (->
    nextMonth = @get 'nextMonth'
    now = @get 'now'

    return if nextMonth then nextMonth.isAfter(now, 'month') else false
  ).property 'nextMonth', 'now'


  isPrevMonthInPast: (->
    prevMonth = @get 'prevMonth'
    now = @get 'now'

    return if prevMonth then prevMonth.isBefore(now, 'month') else false
  ).property 'prevMonth', 'now'


  isPrevMonthBeyondMax: (->
    prevMonth = @get 'prevMonth'
    maxPastDate = @get 'maxPastDate'

    if not prevMonth || not maxPastDate
      return false

    return prevMonth.isBefore(maxPastDate, 'month')
  ).property 'prevMonth', 'maxPastDate'


  isNextMonthBeyondMax: (->
    nextMonth = @get 'nextMonth'
    maxFutureDate = @get 'maxFutureDate'

    if not nextMonth || not maxFutureDate
      return false

    return nextMonth.isAfter(maxFutureDate, 'month')
  ).property 'nextMonth', 'maxFutureDate'


  isPrevDisabled: (->
    if @get 'isPrevMonthBeyondMax'
      return true

    if @get('disablePast') and @get('isPrevMonthInPast')
      return true

    return false
  ).property 'isPrevMonthBeyondMax', 'isPrevMonthInPast', 'disablePast'


  isNextDisabled: (->
    if @get 'isNextMonthBeyondMax'
      return true

    if @get('disableFuture') and @get('isNextMonthInFuture')
      return true

    return false
  ).property 'isNextMonthBeyondMax', 'isNextMonthInFuture', 'disableFuture'

  prevMonthLabel: cpFormatMoment('prevMonth', 'MMMM YYYY')
  nextMonthLabel: cpFormatMoment('nextMonth', 'MMMM YYYY')
  monthLabel:     cpFormatMoment('month', 'MMMM YYYY')


` export default calendar`
