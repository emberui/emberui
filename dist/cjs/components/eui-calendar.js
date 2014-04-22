"use strict";
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var calendar, cpFormatMoment;

cpFormatMoment = function(key, format) {
  return Em.computed(function() {
    var date;
    date = this.get(key);
    if (date) {
      return date.format(format);
    } else {
      return null;
    }
  }).property(key);
};

calendar = Em.Component.extend(styleSupport, {
  tagName: 'eui-calendar',
  classNames: 'eui-calendar',
  showNextMonth: true,
  showPrevMonth: false,
  multiple: false,
  disablePast: null,
  disableFuture: null,
  disableManipulation: null,
  maxPastDate: null,
  maxFutureDate: null,
  month: null,
  disabledDates: null,
  selectedDates: null,
  selectedDate: null,
  init: function() {
    var firstSelectedDate;
    this._super();
    if (!this.get('selectedDates')) {
      this.set('selectedDates', []);
    } else {
      this.set('multiple', true);
    }
    if (this.get('selectedDate')) {
      this.get('selectedDates').addObject(this.get('selectedDate'));
    }
    firstSelectedDate = this.get('selectedDates.firstObject');
    if (!this.get('month') && firstSelectedDate) {
      this.set('month', firstSelectedDate.clone().startOf('month'));
    }
    if (!this.get('month')) {
      return this.set('month', moment().startOf('month'));
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
          return this.removeDate(date);
        } else {
          return this.addDate(date);
        }
      } else {
        if (this.hasDate(date)) {
          return this.set('selectedDate', null);
        } else {
          return this.set('selectedDate', date);
        }
      }
    },
    prev: function() {
      var month;
      month = this.get('month');
      if (!month || this.get('isPrevDisabled')) {
        return;
      }
      return this.set('month', month.clone().subtract('months', 1));
    },
    next: function() {
      var month;
      month = this.get('month');
      if (!month || this.get('isNextDisabled')) {
        return;
      }
      return this.set('month', month.clone().add('months', 1));
    }
  },
  hasDate: function(date) {
    return this.get('selectedDates').any(function(d) {
      return d.isSame(date);
    });
  },
  removeDate: function(date) {
    var dates, removeDates;
    dates = this.get('selectedDates');
    removeDates = dates.filter(function(d) {
      return d.isSame(date);
    });
    return dates.removeObjects(removeDates);
  },
  addDate: function(date) {
    this.removeDate(date);
    return this.get('selectedDates').pushObject(date);
  },
  selectedDateWillChange: (function() {
    return this.removeDate(this.get('selectedDate'));
  }).observesBefore('selectedDate'),
  selectedDateDidChange: (function() {
    var date;
    date = this.get('selectedDate');
    if (!date) {
      return;
    }
    return this.addDate(this.get('selectedDate'));
  }).observes('selectedDate'),
  now: (function() {
    return moment();
  }).property(),
  prevMonth: (function() {
    var month;
    month = this.get('month');
    if (month) {
      return month.clone().subtract('months', 1);
    } else {
      return null;
    }
  }).property('month'),
  nextMonth: (function() {
    var month;
    month = this.get('month');
    if (month) {
      return month.clone().add('months', 1);
    } else {
      return null;
    }
  }).property('month'),
  isNextMonthInFuture: (function() {
    var nextMonth, now;
    nextMonth = this.get('nextMonth');
    now = this.get('now');
    if (nextMonth) {
      return nextMonth.isAfter(now, 'month');
    } else {
      return false;
    }
  }).property('nextMonth', 'now'),
  isPrevMonthInPast: (function() {
    var now, prevMonth;
    prevMonth = this.get('prevMonth');
    now = this.get('now');
    if (prevMonth) {
      return prevMonth.isBefore(now, 'month');
    } else {
      return false;
    }
  }).property('prevMonth', 'now'),
  isPrevMonthBeyondMax: (function() {
    var maxPastDate, prevMonth;
    prevMonth = this.get('prevMonth');
    maxPastDate = this.get('maxPastDate');
    if (!prevMonth || !maxPastDate) {
      return false;
    }
    return prevMonth.isBefore(maxPastDate, 'month');
  }).property('prevMonth', 'maxPastDate'),
  isNextMonthBeyondMax: (function() {
    var maxFutureDate, nextMonth;
    nextMonth = this.get('nextMonth');
    maxFutureDate = this.get('maxFutureDate');
    if (!nextMonth || !maxFutureDate) {
      return false;
    }
    return nextMonth.isAfter(maxFutureDate, 'month');
  }).property('nextMonth', 'maxFutureDate'),
  isPrevDisabled: (function() {
    if (this.get('isPrevMonthBeyondMax')) {
      return true;
    }
    if (this.get('disablePast') && this.get('isPrevMonthInPast')) {
      return true;
    }
    return false;
  }).property('isPrevMonthBeyondMax', 'isPrevMonthInPast', 'disablePast'),
  isNextDisabled: (function() {
    if (this.get('isNextMonthBeyondMax')) {
      return true;
    }
    if (this.get('disableFuture') && this.get('isNextMonthInFuture')) {
      return true;
    }
    return false;
  }).property('isNextMonthBeyondMax', 'isNextMonthInFuture', 'disableFuture'),
  prevMonthLabel: cpFormatMoment('prevMonth', 'MMMM YYYY'),
  nextMonthLabel: cpFormatMoment('nextMonth', 'MMMM YYYY'),
  monthLabel: cpFormatMoment('month', 'MMMM YYYY')
});

 exports["default"] = calendar;