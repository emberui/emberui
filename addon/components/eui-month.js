import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: 'eui-month',

  month: null,

  selection: [],
  disabledDates: [],
  maxPastDate: null,
  maxFutureDate: null,

  onSelect: null,

  setup: Ember.on('init', function() {
    Ember.assert('You must provide a month to eui-month', this.get('month'));
  }),

  days: Ember.computed('month', function() {
    const month = moment(this.get('month')).startOf('month');
    const daysInMonth = month.daysInMonth();
    const dayOfWeek = month.day();
    const slots = [];

    for (let i = 0; i < dayOfWeek; i++) {
      slots.push(undefined);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const slot = moment(month).date(i);
      slots.push(slot);
    }

    return slots;
  })
});
