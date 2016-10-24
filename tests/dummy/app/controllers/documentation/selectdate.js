import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Controller.extend({
  selectedDates: [
    moment().add(1, 'days'), moment().add(2, 'days')
  ],

  maxFutureDate: moment().add(10, 'days'),

  selectedScatteredDates: [
    moment().subtract(4, 'days'),
    moment(),
    moment().add(4, 'days'),
    moment().add(5, 'days')
  ],

  selectedDate: moment().add(1, 'days'),

  disabledDates: [
    moment().add(4, 'days'),
    moment().add(5, 'days'),
    moment().add(6, 'days'),
    moment().add(7, 'days'),
    moment().add(8, 'days'),
    moment().add(9, 'days')],

  valueExample: moment().add(1, 'days').toISOString(),

  actions: {
    dateDidChange(date) {
      window.alert('Date selected was ' + date.toISOString() + ' but we will ignore it.');
    }
  }
});
