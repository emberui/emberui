function cpFormatMoment(key, format) {
  return Em.computed(function() {
    var date = this.get(key);
    return date ? date.format(format) : null;
  }).property(key);
}

export default Em.Component.extend({
  tagName: 'eui-popcal',
  classNames: 'eui-popcal',

  showNextMonth:       true,
  showPrevMonth:       true,
  multiple:            false,
  disablePast:         null,
  disableFuture:       null,
  disableManipulation: null,
  maxPastDate:         null,
  maxFutureDate:       null,
  month:               null,
  disabledDates:       null,
  selectedDates:       null,
  selectedDate:        null,

  init: function() {
    this._super();

    if (!this.get('selectedDates')) {
      this.set('selectedDates', []);
    } else {
      this.set('multiple', true);
    }

    if (this.get('selectedDate')) {
      this.get('selectedDates').addObject(this.get('selectedDate'));
    }

    var firstSelectedDate = this.get('selectedDates.firstObject');

    if (!this.get('month') && firstSelectedDate) {
      this.set('month', firstSelectedDate.clone().startOf('month'));
    }

    if (!this.get('month')) {
      this.set('month', moment().startOf('month'));
    }
  },

  actions: {
    dateSelected: function(date) {
      this.sendAction('select', date);

      if (this.get('disableManipulation')) {
        return;
      }

      if (this.get('multiple')) {
        if (this.hasDate(date)) {
          this.removeDate(date);
        } else {
          this.addDate(date);
        }
      } else {
        if (this.hasDate(date)) {
          this.set('selectedDate', null);
        } else {
          this.set('selectedDate', date);
        }
      }
    },

    prev: function() {
      var month = this.get('month');

      if (!month || this.get('isPrevDisabled')) {
        return;
      }

      this.set('month', month.clone().subtract('months', 1));
    },

    next: function() {
      var month = this.get('month');

      if (!month || this.get('isNextDisabled')) {
        return;
      }

      this.set('month', month.clone().add('months', 1));
    }
  },

  hasDate: function(date) {
    return this.get('selectedDates').any(function(d) {
      return d.isSame(date);
    });
  },

  removeDate: function(date) {
    var dates = this.get('selectedDates');
    var removeDates;

    removeDates = dates.filter(function(d) {
      return d.isSame(date);
    });

    dates.removeObjects(removeDates);
  },

  addDate: function(date) {
    this.removeDate(date);
    this.get('selectedDates').pushObject(date);
  },

  selectedDateWillChange: function() {
    this.removeDate(this.get('selectedDate'));
  }.observesBefore('selectedDate'),

  selectedDateDidChange: function() {
    var date = this.get('selectedDate');

    if (!date) {
      return;
    }

    this.addDate(this.get('selectedDate'));
  }.observes('selectedDate'),

  // TODO: Add timer to invalidate this
  now: function() {
    return moment();
  }.property(),

  prevMonth: function() {
    var month = this.get('month');
    return month ? month.clone().subtract('months', 1) : null;
  }.property('month'),

  nextMonth: function() {
    var month = this.get('month');
    return month ? month.clone().add('months', 1) : null;
  }.property('month'),

  isNextMonthInFuture: function() {
    var nextMonth = this.get('nextMonth'),
        now       = this.get('now');

    return nextMonth ? nextMonth.isAfter(now, 'month') : false;
  }.property('nextMonth', 'now'),

  isPrevMonthInPast: function() {
    var prevMonth = this.get('prevMonth'),
        now       = this.get('now');

    return prevMonth ? prevMonth.isBefore(now, 'month') : false;
  }.property('prevMonth', 'now'),

  isPrevMonthBeyondMax: function() {
    var prevMonth   = this.get('prevMonth'),
        maxPastDate = this.get('maxPastDate');

    if (!prevMonth || !maxPastDate) {
      return false;
    }

    return prevMonth.isBefore(maxPastDate, 'month');
  }.property('prevMonth', 'maxPastDate'),

  isNextMonthBeyondMax: function() {
    var nextMonth     = this.get('nextMonth'),
        maxFutureDate = this.get('maxFutureDate');

    if (!nextMonth || !maxFutureDate) {
      return false;
    }

    return nextMonth.isAfter(maxFutureDate, 'month');
  }.property('nextMonth', 'maxFutureDate'),

  isPrevDisabled: function() {
    if (this.get('isPrevMonthBeyondMax')) {
      return true;
    }

    if (this.get('disablePast') && this.get('isPrevMonthInPast')) {
      return true;
    }

    return false;
  }.property('isPrevMonthBeyondMax', 'isPrevMonthInPast', 'disablePast'),

  isNextDisabled: function() {
    if (this.get('isNextMonthBeyondMax')) {
      return true;
    }

    if (this.get('disableFuture') && this.get('isNextMonthInFuture')) {
      return true;
    }

    return false;
  }.property('isNextMonthBeyondMax', 'isNextMonthInFuture', 'disableFuture'),

  prevMonthLabel: cpFormatMoment('prevMonth', 'MMMM YYYY'),
  nextMonthLabel: cpFormatMoment('nextMonth', 'MMMM YYYY'),
  monthLabel:     cpFormatMoment('month', 'MMMM YYYY')
});
