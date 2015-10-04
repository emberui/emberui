import Ember from 'ember';

const containsDate = function(dates, date) {
  if (!dates || !Ember.get(dates, 'length')) {
    return false;
  }

  return dates.find((d) => {
    return date.isSame(d, 'day');
  });
};

const forEachSlot = function(month, iter) {
  const totalDays = month.daysInMonth();
  const firstDay = month.clone().startOf('month').weekday();
  let currentDay = 1;

  const popCurrentDay = function() {
    if (currentDay > totalDays) {
      return null;
    } else {
      return moment([month.year(), month.month(), currentDay++]);
    }
  };

  let results = [];

  for (let week, i = 0; i <= 6; week = ++i) {
    for (let day, j = 0; j <= 6; day = ++j) {
      if (week === 0) {
        iter(day < firstDay ? null : popCurrentDay());
      } else {
        iter(currentDay <= totalDays ? popCurrentDay() : null);
      }
    }

    if (currentDay > totalDays) {
      break;
    } else {
      results.push(void 0);
    }
  }

  return results;
};

export default Ember.Component.extend({
  tagName: 'ol',
  classNames: 'eui-month',
  month: null,
  selection: null,
  disabledDates: null,

  maxPastDate: null,
  maxFutureDate: null,

  setup: Ember.on('init', function() {
    if (!this.get('selection')) {
      throw 'you must provide selection to eui-month';
    }
  }),

  click(event) {
    const target = $(event.target);
    if (target.is('.eui-disabled')) {
      return;
    }

    if (target.is('[data-date]')) {
      return this.sendAction('select', moment(target.data('date'), 'YYYY-MM-DD'));
    }
  },

  monthDidChange: Ember.observer('month', function() {
    return Em.run.scheduleOnce('afterRender', this, 'rerender');
  }),

  selectionDidChange: Ember.observer('selection.[]', function() {
    return Em.run.scheduleOnce('afterRender', this, 'setSelection');
  }),

  setSelection() {
    const dates = this.get('selection');

    if (this._state === !'inDOM') {
      return;
    }

    this.$('li').removeClass('eui-selected');

    let results = [];

    dates.forEach((date) => {
      let json = date.format('YYYY-MM-DD');
      results.push(this.$('[data-date="' + json + '"]').addClass('eui-selected'));
    });

    return results;
  },

  didInsertElement() {
    return this.setSelection();
  },

  render(buff) {
    const month = this.get('month');
    const view = this;

    if (!month) {
      return;
    }

    const data = {
      buffer: buff,
      view: view
    };

    const renderSlot = function(slot) {
      let attrs;

      if (slot) {
        attrs = {
          date: slot.format('D'),
          jsonDate: slot.format('YYYY-MM-DD'),
          classNames: ['eui-slot', 'eui-day']
        };

        view.applyOptionsForDate(attrs, slot);
        attrs.classNames = attrs.classNames.join(' ');

        buff.push(`<li class='${attrs.classNames}' data-date='${attrs.jsonDate}'>${attrs.date}</li>`);

      } else {
        return buff.push('<li class="eui-slot eui-empty"></li>');
      }
    };

    return forEachSlot(month, function(slot) {
      return renderSlot(slot);
    });
  },

  applyOptionsForDate: function(options, date) {
    const disabledDates = this.get('disabledDates');
    const selection = this.get('selection');
    const maxPastDate = this.get('maxPastDate');
    const maxFutureDate = this.get('maxFutureDate');

    if (moment().isSame(date, 'day')) {
      options.classNames.push('eui-today');
    }

    if ((disabledDates && containsDate(disabledDates, date)) ||
        (maxPastDate && date.isBefore(maxPastDate, 'day')) ||
        (maxFutureDate && date.isAfter(maxFutureDate, 'day'))) {
      options.classNames.push('eui-disabled');
    }

    if (selection && containsDate(selection, date)) {
      options.classNames.push('eui-selected');
    }
  }
});
