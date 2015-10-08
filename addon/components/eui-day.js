import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['eui-month--slot', 'eui-month--day'],
  classNameBindings: [
    'isSelected:eui-month--selected',
    'isDisabled:eui-month--disabled',
    'isToday:eui-month--today'],
  tagName: 'li',

  date: null,

  selection: [],
  disabledDates: [],
  maxPastDate: null,
  maxFutureDate: null,

  today: moment(),

  day: Ember.computed('date', function() {
    return this.get('date').format('D');
  }),

  isSelected: Ember.computed('date', 'selection', function() {
    const date = this.get('date');
    const selection = this.get('selection');

    return selection.find((selection) => {
      return selection.isSame(date, 'day');
    })
  }),

  isDisabled: Ember.computed('date', 'disabledDates', 'maxPastDate', 'maxFutureDate', function() {
    const date = this.get('date');
    const disabledDates = this.get('disabledDates') || [];

    const isDisabledDate = disabledDates.find((disabledDate) => {
      return disabledDate.isSame(date, 'day');
    });

    if (isDisabledDate) { return true; }

    const maxPastDate = this.get('maxPastDate');
    const maxFutureDate = this.get('maxFutureDate');

    if (maxPastDate && date.isBefore(maxPastDate)) {
      return true;
    }

    if (maxFutureDate && date.isAfter(maxFutureDate)) {
      return true;
    }
  }),

  isToday: Ember.computed('date', 'today', function() {
    return this.get('date').isSame(this.get('today'), 'day');
  })
});
