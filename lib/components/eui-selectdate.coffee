`import disabledSupport from '../mixins/disabled-support'`
`import validationSupport from '../mixins/validation-support'`
`import animationsDidComplete from '../mixins/animations-did-complete'`
`import modalBehaviour from '../mixins/modal-behaviour'`

select = Em.Component.extend disabledSupport, validationSupport, animationsDidComplete, modalBehaviour,
  tagName: 'eui-selectdate'
  classNames: ['eui-selectdate']
  classNameBindings: ['isDisabled:eui-disabled', 'selection::eui-placeholder', 'class']

  style: 'default'
  size: 'medium'

  allowMultiple: false


  actions:
    toggleCalendar: ->
      @toggleProperty 'open'

    closeCalendar: ->
      allowMultiple = @get 'allowMultiple'
      selection = @get 'selection'

      if allowMultiple
        if selection and selection.get('length') > 1
          @hide()

      else
        @hide()


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
    value = null

    if selection
      if Em.isArray(selection)

        # If they are in the middle of selecting a date range we want to only show the first date
        if selection.get('length') < 2
          value = selection.get('firstObject')

        else
          value = [selection.get('firstObject'), selection.get('lastObject')]
      else
        value = selection

    return @formatDate(value) || @get 'placeholder'


  # Formats a single date or a date range smartly

  formatDate: (dates) ->
    return unless dates

    if Em.isArray(dates)
      label = moment(dates.get('firstObject')).format('MMMM Do') + ' to ' + moment(dates.get('lastObject')).format('MMMM Do')

    else
      label = moment(dates).format('MMMM Do')

    return label


  # Overide validation-support mixin to check validation on change even if no error
  # This is needed because the select will not receive the blur event when the user
  # select and option

  onChange:  (->
    Ember.run.once @, 'validateField'
  ).observes 'value'

`export default select`
