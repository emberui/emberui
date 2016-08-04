import Ember from 'ember';
import disabledSupport from '../mixins/disabled-support';
import widthSupport from '../mixins/width-support';
import errorSupport from '../mixins/error-support';

const HOURS_12 = [
  { value: 0, label: "12" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "1" },
  { value: 14, label: "2" },
  { value: 15, label: "3" },
  { value: 16, label: "4" },
  { value: 17, label: "5" },
  { value: 18, label: "6" },
  { value: 19, label: "7" },
  { value: 20, label: "8" },
  { value: 21, label: "9" },
  { value: 22, label: "10" },
  { value: 23, label: "11" }
];

const HOURS_24 = [
  { value: 0, label: "00" },
  { value: 1, label: "01" },
  { value: 2, label: "02" },
  { value: 3, label: "03" },
  { value: 4, label: "04" },
  { value: 5, label: "05" },
  { value: 6, label: "06" },
  { value: 7, label: "07" },
  { value: 8, label: "08" },
  { value: 9, label: "09" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "13" },
  { value: 14, label: "14" },
  { value: 15, label: "15" },
  { value: 16, label: "16" },
  { value: 17, label: "17" },
  { value: 18, label: "18" },
  { value: 19, label: "19" },
  { value: 20, label: "20" },
  { value: 21, label: "21" },
  { value: 22, label: "22" },
  { value: 23, label: "23" }
];

const MINUTES = [
  { value: 0, label: "00" },
  { value: 5, label: "05" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
  { value: 35, label: "35" },
  { value: 40, label: "40" },
  { value: 45, label: "45" },
  { value: 50, label: "50" },
  { value: 55, label: "55" }
];

export default Ember.Component.extend(disabledSupport, errorSupport, widthSupport, {
  classNameBindings: ['isDisabled:eui-disabled', 'class'],
  tagName: 'eui-select-time',

  baseClass: 'select',
  style: 'default',
  size: 'medium',

  onChange: null,

  showTimePicker: false,
  show24Clock: false,

  selection: null,
  _selection: moment().minute(0).hour(10).second(0).millisecond(0),

  attachment: 'center center',
  targetAttachment: 'center center',

  isAm: Ember.computed('_selection', function () {
    return this.get('_selection').hour() < 12;
  }),

  isPm: Ember.computed('_selection', function () {
    return this.get('_selection').hour() > 11;
  }),

  hours: Ember.computed('show24Clock', 'isAm', function () {
    if (this.get('show24Clock')) {
      return HOURS_24;
    } else {
      if (this.get('isAm')) {
        return HOURS_12.slice(0, 12);
      } else {
        return HOURS_12.slice(12);
      }
    }
  }),

  minutes: Ember.computed(function() {
    return MINUTES;
  }),

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

  isPlaceholder: Ember.computed.empty('selection'),

  format: Ember.computed('show24Clock', function () {
    if (this.get('show24Clock')) {
      return 'HH:mm';
    } else {
      return 'h:mma';
    }
  }),

  buttonLabel: Ember.computed('selection', 'placeholder', 'format', function() {
    const selection = this.get('selection');

    if (!selection) {
      return this.get('placeholder');
    }

    return selection.format(this.get('format'));
  }),

  timePickerLabel: Ember.computed('_selection', 'format', function() {
    return this.get('_selection').format(this.get('format'));
  }),

  actions: {
    openTimePicker() {
      this.set('showTimePicker', true);

      if (this.get('selection')){
        this.set('_selection', moment(this.get('selection')));
      }
    },

    closeTimePicker() {
      this.set('showTimePicker', false);

      if (this.get('onchange')) {
        this.send('onchange', this.get('_selection'));
      } else {
        this.set('selection', this.get('_selection'))
      }
    },

    selectHour(hour) {
      this.set('_selection', moment(this.get('_selection')).hours(hour));
    },

    selectMinute(minute) {
      this.set('_selection', moment(this.get('_selection')).minute(minute));
    },

    setToAm() {
      this.set('_selection', moment(this.get('_selection')).subtract(12, 'hours'));
    },

    setToPm() {
      this.set('_selection', moment(this.get('_selection')).add(12, 'hours'));
    }
  },

  // Error check should happen without user having to focus on component
  isEntered: true
});
