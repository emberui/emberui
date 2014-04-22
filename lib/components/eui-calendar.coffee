cpFormatMoment = (key, format) ->
  return Em.computed( ->
    date = @get(key)
    return if date then date.format(format) else null
  ).property(key)


calendar = Em.Component.extend
  tagName: 'eui-calendar'
  classNames: 'eui-calendar'

  showNextMonth:       true
  showPrevMonth:       false
  multiple:            false
  disablePast:         null
  disableFuture:       null
  disableManipulation: null
  maxPastDate:         null
  maxFutureDate:       null
  month:               null
  disabledDates:       null
  selectedDates:       null
  selectedDate:        null

  init: ->
    @_super()

    unless this.get('selectedDates')
      @set 'selectedDates', []
    else
      @set 'multiple', true

    if @get 'selectedDate'
      @get('selectedDates').addObject(@get 'selectedDate')

    firstSelectedDate = @get 'selectedDates.firstObject'

    if not @get('month') and firstSelectedDate
      @set 'month', firstSelectedDate.clone().startOf('month')

    unless @get 'month'
      @set 'month', moment().startOf('month')


  actions:
    dateSelected: (date) ->
      @sendAction 'select', date

      if @get 'disableManipulation'
        return

      if @get 'multiple'
        if @hasDate(date)
          @removeDate(date)
        else
          @addDate(date)

      else
        if @.hasDate(date)
          @set 'selectedDate', null
        else
          @set 'selectedDate', date


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


  hasDate: (date) ->
    return @get('selectedDates').any (d) ->
      return d.isSame(date)


  removeDate: (date) ->
    dates = @get 'selectedDates'

    removeDates = dates.filter (d) ->
      return d.isSame(date)

    dates.removeObjects(removeDates)


  addDate: (date) ->
    @removeDate date
    @get('selectedDates').pushObject(date)


  selectedDateWillChange: (->
    @removeDate @get 'selectedDate'
  ).observesBefore 'selectedDate'


  selectedDateDidChange: (->
    date = @get 'selectedDate'

    unless date
      return

    @addDate @get 'selectedDate'
  ).observes 'selectedDate'


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
