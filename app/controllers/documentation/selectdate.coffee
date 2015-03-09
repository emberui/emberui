controller = Ember.ObjectController.extend
  selectedDates: [
    moment('2014-04-25'),
    moment('2014-04-26')
  ]

  maxFutureDate: moment('2014-05-15')

  selectedScatteredDates: [
    moment('2014-04-21'),
    moment('2014-04-25'),
    moment('2014-04-29'),
    moment('2014-04-30')
  ]

  selectedDate: moment('2014-04-26')

  disabledDates: [
    moment('2014-05-20'),
    moment('2014-05-21'),
    moment('2014-05-22'),
    moment('2014-05-23'),
    moment('2014-05-24'),
    moment('2014-05-25'),
    moment('2014-05-26')
  ]

`export default controller`
