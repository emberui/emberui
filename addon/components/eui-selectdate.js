import Ember from 'ember';
import disabledSupport from '../mixins/disabled-support';
import widthSupport from '../mixins/width-support';
import errorSupport from '../mixins/error-support';
import moment from 'npm:moment';
import twix from 'npm:twix';

export default Ember.Component.extend(disabledSupport, errorSupport, widthSupport, {
  classNameBindings: ['isDisabled:eui-disabled', 'class'],
  tagName: 'eui-selectdate',

  baseClass: 'select',
  style: 'default',
  size: 'medium',
  calendarStyle: 'default',

  onChange: null,

  selection: [],
  _selection: [],

  allowMultiple: false,
  continuousSelection: true,

  showCalendarWindow: false,

  formatting: {
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    dayFormat: "D"
  },

  attachment: 'center center',
  targetAttachment: 'center center',

  animateInPopup(element) {
    return window.$.Velocity.animate(element, {
      opacity: [1, 0],
      scaleX: [1, 0],
      scaleY: [1, 0]
    }, {
      duration: 200
    });
  },

  animateOutPopup(element) {
    return window.$.Velocity.animate(element, {
      opacity: [0, 1],
      scaleX: [0, 1],
      scaleY: [0, 1]
    }, {
      duration: 200
    });
  },

  month: Ember.computed('', function() {
    let firstSelectedDate = this.get('selection.firstObject');

    if (firstSelectedDate) {
      return moment(firstSelectedDate).date(1);
    } else {
      return moment();
    }
  }),

  monthLabel: Ember.computed('month', function() {
    return this.get('month').format('MMMM YYYY');
  }),

  nextMonth: Ember.computed('month', function() {
    let month = this.get('month');
    return moment(month).add(1, 'months');
  }),

  nextMonthLabel: Ember.computed('nextMonth', function() {
    return this.get('nextMonth').format('MMMM YYYY');
  }),

  // Return Unix Time stamp of selections
  value: Ember.computed('selection.[]', {
    get() {
      const selection = this.get('selection');

      if (!selection) {
        if (this.get('allowMultiple')) {
          return [];
        } else {
          return null;
        }
      }

      if (Ember.isArray(selection)) {
        return selection.map((date) => {
          return date.toISOString();
        });
      } else {
        return selection.toISOString();
      }
    },

    set(key, value) {
      if (!value) {
        this.set('selection', null);
        return null;
      }

      if (Ember.isArray(value)) {
        let newSelection = value.map((v) => {
          return moment(v);
        });

        this.set('selection', newSelection);

      } else {
        this.set('selection', moment(value));
      }

      return value;
    }
  }),

  isPlaceholder: Ember.computed('selection', function() {
    let selection = this.get('selection');
    return (!selection || (Ember.isArray(selection) && selection.length === 0));
  }),

  buttonLabel: Ember.computed('selection.[]', 'placeholder', function() {
    const selection = this.get('selection');
    const formatting = this.get('formatting');

    if (!selection || (Ember.isArray(selection) && selection.length === 0)) {
      return this.get('placeholder');
    }

    if (Ember.isArray(selection)) {
      if (selection.length < 2) {
        const startDate = selection[0];
        return this.formatDate(startDate);

      } else {
        const startDate = selection[0];
        const endDate = selection[selection.length - 1];

        return this.formatDateRange(startDate, endDate);
      }
    }

    return this.formatDate(selection, formatting);
  }),

  actions: {
    openCalendar() {
      let selection = this.get('selection');

      if (Ember.isArray(selection)) {
        this.set('_selection', selection);

      } else if (selection) {
        this.set('_selection', [selection]);

      } else {
        this.set('_selection', []);
      }

      return this.set('showCalendarWindow', true);
    },

    closeCalendar() {
      const allowMultiple = this.get('allowMultiple');
      const continuousSelection = this.get('continuousSelection');
      const onChange = this.get('onChange');
      const selection = this.get('_selection');

      if (allowMultiple && !continuousSelection) {
        if (onChange) {
          this.sendAction('onChange', selection);

        } else {
          this.set('selection', selection);
        }
      }

      this.set('showCalendarWindow', false);
    },

    toggleDates(closeModal, date) {
      const allowMultiple = this.get('allowMultiple');
      const continuousSelection = this.get('continuousSelection');
      const selection = this.get('_selection');

      if (allowMultiple && continuousSelection) {
        if (selection.length === 1) {
          if (date.isSame(selection[0])) {
            this.removeDate(date);

          } else {
            this.addDateRange(selection[0], date);
            this.send('closeAndUpdateSelection', closeModal);
          }

        } else {
          this.set('_selection', [date]);
        }

      } else if (allowMultiple && !continuousSelection) {
        if (this.hasDate(date)) {
          this.removeDate(date);

        } else {
          this.addDate(date);
        }

      } else {
        if (this.hasDate(date, selection)) {
          this.set('_selection', []);

        } else {
          this.set('_selection', [date]);
          this.send('closeAndUpdateSelection', closeModal);
        }
      }
    },

    previousMonth() {
      let month = this.get('month');
      const previousMonth = moment(month).subtract(1, 'months');

      this.set('month', previousMonth);
    },

    nextMonth() {
      let month = this.get('month');
      const nextMonth = moment(month).add(1, 'months');

      this.set('month', nextMonth);
    },

    closeAndUpdateSelection(closeModal) {
      const allowMultiple = this.get('allowMultiple');
      const selection = this.get('_selection');
      const onChange = this.get('onChange');

      if (onChange) {
        if (allowMultiple) {
          this.sendAction('onChange', selection);

        } else {
          this.sendAction('onChange', selection[0]);
        }

      } else {
        if (allowMultiple) {
          this.set('selection', selection);

        } else {
          this.set('selection', selection[0]);
        }
      }

      closeModal().then(() => {
        this.set('showCalendarWindow', false);
      });
    }
  },

  keyUp: function(event) {
    // Down Arrow
    if (event.which === 40) {
      event.preventDefault();
      this.set('showCalendarWindow', true);
    }
  },

  formatDate(date, formatting) {
    if (!date) {
      return;
    }

    return date.twix(date, true).format(formatting);
  },

  formatDateRange(startDate, endDate, formatting) {
    if (!startDate) {
      return;
    }

    // No end date is selected so show partial date
    if (!endDate) {
      return startDate.twix(startDate, true).format(formatting) + ' -';
    }

    // Full date range
    if (startDate && endDate) {
      if (endDate.isBefore(startDate)) {
        return endDate.twix(startDate, true).format(formatting);
      } else {
        return startDate.twix(endDate, true).format(formatting);
      }
    }
  },

  hasDate(date) {
    const selection = this.get('_selection');

    return selection.find((item) => {
      return item.isSame(date, 'day');
    });
  },

  removeDate(date) {
    const selection = this.get('_selection');

    const removeDates = selection.filter((item) => {
      return item.isSame(date, 'day');
    });

    if (removeDates.length) {
      let newSelection = [];

      selection.forEach((item) => {
        if (removeDates.indexOf(item) === -1) {
          newSelection.push(item);
        }
      });

      this.set('_selection', newSelection);
    }
  },

  addDate(date) {
    let selection = this.get('_selection');
    let newSelection = [];

    this.removeDate(date);

    selection.forEach((item) => {
      newSelection.push(item);
    });

    newSelection.push(date);

    this.set('_selection', newSelection);
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

    this.set('_selection', newSelection);
  },

  isDisabledDate(date) {
    const disabledDates = this.get('disabledDates');

    if (!disabledDates) {
      return;
    }

    return disabledDates.find((item) => {
      return item.isSame(date, 'day');
    });
  },

  // Error check should happen without user having to focus on component
  isEntered: true
});
