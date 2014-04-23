DATE_SLOT_HBS = Handlebars.compile(
  '<li class="{{classNames}}" data-date="{{jsonDate}}">' +
    '{{date}}' +
  '</li>')


containsDate = (dates, date) ->
  if !dates || not Em.get(dates, 'length')
    return false

  return dates.any (d) ->
    return date.isSame(d, 'day')


forEachSlot = (month, iter) ->
  totalDays  = month.daysInMonth()
  firstDay   = month.clone().startOf('month').weekday()
  currentDay = 1

  popCurrentDay = ->
    if currentDay > totalDays
      return null
    else
      return moment([month.year(), month.month(), currentDay++])

  for week in [0..6]
    for day in [0..6]
      if week is 0
        iter( if day < firstDay then null else popCurrentDay() )
      else
        iter( if currentDay <= totalDays then popCurrentDay() else null )

    if currentDay > totalDays
      break


month = Em.Component.extend
  tagName:      'ol'
  classNames:   'eui-month'
  month:         null
  selection:     null
  disabledDates: null

  init: ->
    @_super()

    unless @get 'selection'
      throw 'you must provide selection to eui-month'

  click: (event) ->
    $target = $(event.target)

    if $target.is('.eui-disabled')
      return

    if $target.is('[data-date]')
      @sendAction('select', moment($target.data('date'), 'YYYY-MM-DD'))


  monthDidChange: (->
    Em.run.scheduleOnce 'afterRender', @, 'rerender'
  ).observes 'month'


  selectionDidChange: (->
    Em.run.scheduleOnce 'afterRender', @, 'setSelection'
  ).observes 'selection.@each'


  setSelection: ->
    dates = @get 'selection'
    view  = @
    json

    if @state is not 'inDOM'
      return

    @.$('li').removeClass 'eui-selected'

    for date in dates
      json = date.format('YYYY-MM-DD')
      view.$('[data-date="' + json + '"]').addClass('eui-selected')


  didInsertElement: ->
    @setSelection()


  render: (buff) ->
    month = @get 'month'
    view  = @

    unless month
      return

    renderSlot = (slot) ->
      attrs

      if slot
        attrs = {
          date:       slot.format('D'),
          jsonDate:   slot.format('YYYY-MM-DD'),
          classNames: ['eui-slot', 'eui-day']
        }

        view.applyOptionsForDate(attrs, slot)
        attrs.classNames = attrs.classNames.join(' ')
        buff.push(DATE_SLOT_HBS(attrs))

      else
        buff.push('<li class="eui-slot eui-empty"></li>')

    forEachSlot(month, (slot) ->
      renderSlot(slot)
    )


  applyOptionsForDate: (options, date) ->
    disabledDates = @get 'disabledDates'
    selection = @get 'selection'

    if moment().isSame(date, 'day')
      options.classNames.push('eui-today')

    if disabledDates && containsDate(disabledDates, date)
      options.classNames.push('eui-disabled')

    if selection && containsDate(selection, date)
      options.classNames.push('eui-selected')


`export default month`
