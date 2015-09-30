import Ember from 'ember';
import className from '../mixins/class-name';

export default Ember.Component.extend(className, {
  tagName: 'eui-calendar',

  baseClass: 'calendar',
  style: 'default',

  showNextMonth: true,
  showPrevMonth: false,

  disabledDates: null,
  disablePast: null,
  disableFuture: null,

  maxPastDate: null,
  maxFutureDate: null,

  month: null,

  allowMultiple: false,
  continuousSelection: true,
  _selection: [],

  setup: Ember.on('init', function() {
    Ember.warn('EUI-CALENDAR: You have passed in multiple dates without allowing for mulitple date _selection', !(this.get('_selection.length') > 1 && !this.get('allowMultiple')));

    const firstSelectedDate = this.get('_selection.firstObject');

    if (!this.get('month') && firstSelectedDate) {
      this.set('month', firstSelectedDate.clone().startOf('month'));
    }

    if (!this.get('month')) {
      return this.set('month', moment().startOf('month'));
    }
  }),

  actions: {
    dateSelected(date) {
      if (this.get('allowMultiple')) {
        if (this.get('continuousSelection')) {
          if (this.get('_selection.length') === 1) {
            if (date.isSame(this.get('_selection.firstObject'))) {
              this.set('_selection', []);
            } else {
              this.addDateRange(this.get('_selection.firstObject'), date);
            }
          } else {
            this.set('_selection', [date]);
          }

        } else {
          if (this.hasDate(date)) {
            this.removeDate(date);
          } else {
            this.addDate(date);
          }
        }

      } else {
        if (this.hasDate(date)) {
          this.set('_selection', []);
        } else {
          this.set('_selection', [date]);
        }
      }

      return Ember.run.next(this, function() {
        return this.sendAction('onChange', date);
      });
    },

    prev() {
      const month = this.get('month');

      if (!month || this.get('isPrevDisabled')) {
        return;
      }

      return this.set('month', month.clone().subtract(1, 'months'));
    },

    next() {
      const month = this.get('month');

      if (!month || this.get('isNextDisabled')) {
        return;
      }

      return this.set('month', month.clone().add(1, 'months'));
    }
  },

  selection: Ember.computed('_selection', {
    get: function(key) {
      const selection = this.get('_selection');

      if (this.get('allowMultiple')) {
        return selection;

      } else {
        return selection[0];
      }
    },
    set: function(key, value) {
      if (Ember.isArray(value)) {
        this.set('_selection', Ember.A(value));

      } else if (value) {
        this.set('_selection', Ember.A([value]));

      } else {
        this.set('_selection', Ember.A([]));
      }

      return value;
    }
  }),

  hasDate(date) {
    return this.get('_selection').find((d) => {
      return d.isSame(date, 'day');
    });
  },

  isDisabledDate(date) {
    const disabledDates = this.get('disabledDates');

    if (!disabledDates) {
      return;
    }

    return disabledDates.find((d) => {
      return d.isSame(date);
    });
  },

  removeDate(date) {
    let dates = this.get('_selection');

    const removeDates = dates.filter((d) => {
      return d.isSame(date, 'day');
    });

    if (removeDates.length) {
      dates.removeObjects(removeDates);
    }
  },

  addDate(date) {
    this.removeDate(date);
    this.get('_selection').pushObject(date);
  },

  addDateRange(startDate, endDate) {
    let day = moment(startDate);
    let newSelection = [startDate];

    if (endDate.isBefore(startDate)) {
      day.subtract(1, 'days');

      while (!day.isBefore(endDate)) {
        if (!this.isDisabledDate(moment(day))) {
          newSelection.push(moment(day));
        }
        day.subtract(1, 'days');
      }

    } else {
      day.add(1, 'days');

      while (!day.isAfter(endDate)) {
        if (!this.isDisabledDate(moment(day))) {
          newSelection.push(moment(day));
        }
        day.add(1, 'days');
      }
    }

    return this.set('selection', newSelection);
  },

  now: Ember.computed('', function() {
    return moment();
  }),

  prevMonth: Ember.computed('month', function() {
    const month = this.get('month');

    if (month) {
      return month.clone().subtract(1, 'months');
    } else {
      return null;
    }
  }),

  nextMonth: Ember.computed('month', function() {
    const month = this.get('month');

    if (month) {
      return month.clone().add(1, 'months');
    } else {
      return null;
    }
  }),

  isNextMonthInFuture: Ember.computed('nextMonth', 'now', function() {
    const nextMonth = this.get('nextMonth');
    const now = this.get('now');

    if (nextMonth) {
      return nextMonth.isAfter(now, 'month');
    } else {
      return false;
    }
  }),

  isPrevMonthInPast: Ember.computed('prevMonth', 'now', function() {
    const prevMonth = this.get('prevMonth');
    const now = this.get('now');

    if (prevMonth) {
      return prevMonth.isBefore(now, 'month');
    } else {
      return false;
    }
  }),

  isPrevMonthBeyondMax: Ember.computed('prevMonth', 'maxPastDate', function() {
    const prevMonth = this.get('prevMonth');
    const maxPastDate = this.get('maxPastDate');

    if (!prevMonth || !maxPastDate) {
      return false;
    }

    return prevMonth.isBefore(maxPastDate, 'month');
  }),

  isNextMonthBeyondMax: Ember.computed('nextMonth', 'maxFutureDate', function() {
    const nextMonth = this.get('nextMonth');
    const maxFutureDate = this.get('maxFutureDate');

    if (!nextMonth || !maxFutureDate) {
      return false;
    }

    return nextMonth.isAfter(maxFutureDate, 'month');
  }),

  isPrevDisabled: Ember.computed('isPrevMonthBeyondMax', 'isPrevMonthInPast', 'disablePast', function() {
    if (this.get('isPrevMonthBeyondMax')) {
      return true;
    }

    if (this.get('disablePast') && this.get('isPrevMonthInPast')) {
      return true;
    }

    return false;
  }),

  isNextDisabled: Ember.computed('isNextMonthBeyondMax', 'isNextMonthInFuture', 'disableFuture', function() {
    if (this.get('isNextMonthBeyondMax')) {
      return true;
    }

    if (this.get('disableFuture') && this.get('isNextMonthInFuture')) {
      return true;
    }

    return false;
  }),

  prevMonthLabel: Ember.computed('prevMonth', function() {
    return this.get('prevMonth').format('MMMM YYYY');
  }),

  nextMonthLabel: Ember.computed('nextMonth', function() {
    return this.get('nextMonth').format('MMMM YYYY');
  }),

  monthLabel: Ember.computed('month', function() {
    return this.get('month').format('MMMM YYYY');
  })
});
