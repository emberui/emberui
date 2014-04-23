define(
  ["../mixins/style-support","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
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
      disabledDates: null,
      disablePast: null,
      disableFuture: null,
      disableManipulation: null,
      maxPastDate: null,
      maxFutureDate: null,
      month: null,
      allowMultiple: false,
      _selection: [],
      init: function() {
        var firstSelectedDate;
        this._super();
        Ember.warn('EUI-CALENDAR: You have passed in multiple dates without allowing for mulitple date _selection', !(this.get('_selection.length') > 1 && !this.get('allowMultiple')));
        firstSelectedDate = this.get('_selection.firstObject');
        if (!this.get('month') && firstSelectedDate) {
          this.set('month', firstSelectedDate.clone().startOf('month'));
        }
        if (!this.get('month')) {
          return this.set('month', moment().startOf('month'));
        }
      },
      actions: {
        dateSelected: function(date) {
          this.sendAction('selectAction', date);
          if (this.get('disableManipulation')) {
            return;
          }
          if (this.get('allowMultiple')) {
            if (this.hasDate(date)) {
              return this.removeDate(date);
            } else {
              return this.addDate(date);
            }
          } else {
            if (this.hasDate(date)) {
              return this.set('_selection', [null]);
            } else {
              return this.set('_selection', [date]);
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
      selection: Ember.computed(function(key, value) {
        var selection;
        if (arguments.length === 2) {
          if (this.get('allowMultiple')) {
            if (Ember.isArray(value)) {
              this.set('_selection', value);
            } else {
              this.set('_selection', [value]);
            }
          }
          return value;
        } else {
          selection = this.get('_selection');
          if (this.get('allowMultiple')) {
            return selection;
          } else {
            return selection.get('firstObject');
          }
        }
      }).property('_selection'),
      hasDate: function(date) {
        return this.get('_selection').any(function(d) {
          return d.isSame(date);
        });
      },
      removeDate: function(date) {
        var dates, removeDates;
        dates = this.get('_selection');
        removeDates = dates.filter(function(d) {
          return d.isSame(date);
        });
        return dates.removeObjects(removeDates);
      },
      addDate: function(date) {
        this.removeDate(date);
        return this.get('_selection').pushObject(date);
      },
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

     __exports__["default"] = calendar;
  });