define(
  ["../mixins/class-name","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var className = __dependency1__["default"] || __dependency1__;
    var calendar;

    calendar = Em.Component.extend(className, {
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
      setup: (function() {
        var firstSelectedDate;
        Ember.warn('EUI-CALENDAR: You have passed in multiple dates without allowing for mulitple date _selection', !(this.get('_selection.length') > 1 && !this.get('allowMultiple')));
        firstSelectedDate = this.get('_selection.firstObject');
        if (!this.get('month') && firstSelectedDate) {
          this.set('month', firstSelectedDate.clone().startOf('month'));
        }
        if (!this.get('month')) {
          return this.set('month', moment().startOf('month'));
        }
      }).on('init'),
      actions: {
        dateSelected: function(date) {
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
            return this.sendAction('selectAction', date);
          });
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
      selection: Ember.computed('_selection', function(key, value) {
        var selection;
        if (arguments.length === 2) {
          if (Ember.isArray(value)) {
            this.set('_selection', value);
          } else if (value) {
            this.set('_selection', [value]);
          } else {
            this.set('_selection', []);
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
      }),
      hasDate: function(date) {
        return this.get('_selection').any(function(d) {
          return d.isSame(date);
        });
      },
      isDisabledDate: function(date) {
        var disabledDates;
        disabledDates = this.get('disabledDates');
        if (!disabledDates) {
          return;
        }
        return disabledDates.any(function(d) {
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
      addDateRange: function(startDate, endDate) {
        var day, newSelection;
        day = moment(startDate);
        newSelection = [startDate];
        if (endDate.isBefore(startDate)) {
          day.subtract('days', 1);
          while (!day.isBefore(endDate)) {
            if (!this.isDisabledDate(moment(day))) {
              newSelection.pushObject(moment(day));
            }
            day.subtract('days', 1);
          }
        } else {
          day.add('days', 1);
          while (!day.isAfter(endDate)) {
            if (!this.isDisabledDate(moment(day))) {
              newSelection.pushObject(moment(day));
            }
            day.add('days', 1);
          }
        }
        return this.set('selection', newSelection);
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
      prevMonthLabel: Em.computed('prevMonth', function() {
        return this.get('prevMonth').format('MMMM YYYY');
      }),
      nextMonthLabel: Em.computed('nextMonth', function() {
        return this.get('nextMonth').format('MMMM YYYY');
      }),
      monthLabel: Em.computed('month', function() {
        return this.get('month').format('MMMM YYYY');
      })
    });

     __exports__["default"] = calendar;
  });