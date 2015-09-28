controller = Ember.ObjectController.extend
  selectedDates: [
    moment(),
    moment().add(1, 'days')
  ]

  selectedScatteredDates: [
    moment().subtract(4, 'days'),
    moment(),
    moment().add(4, 'days'),
    moment().add(5, 'days')
  ]

  selectedDate: moment().add(1, 'days')

  maxPastDate: moment()

  maxFutureDate: moment()

  disabledDates: [
    moment(),
    moment().add(1, 'days')
  ]

`export default controller`
