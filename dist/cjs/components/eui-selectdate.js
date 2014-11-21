"use strict";
var disabledSupport = require("../mixins/disabled-support")["default"] || require("../mixins/disabled-support");
var widthSupport = require("../mixins/width-support")["default"] || require("../mixins/width-support");
var errorSupport = require("../mixins/error-support")["default"] || require("../mixins/error-support");
var popcalComponent = require("../components/eui-popcal")["default"] || require("../components/eui-popcal");
var select;

select = Em.Component.extend(disabledSupport, errorSupport, widthSupport, {
  tagName: 'eui-selectdate',
  classNameBindings: ['isDisabled:eui-disabled', 'isPlaceholder::eui-placeholder', 'class'],
  baseClass: 'select',
  style: 'default',
  size: 'medium',
  calendarStyle: 'default',
  popcalIsOpen: false,
  dateRange: false,
  selectClass: Ember.computed('size', 'style', function() {
    var baseClass, size, style;
    baseClass = this.get('baseClass');
    size = this.get('size');
    style = this.get('style');
    return "eui-" + baseClass + "-button-" + size + "-" + style;
  }),
  formatting: {
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    dayFormat: "D"
  },
  value: Em.computed('selection.@each', function(key, value) {
    var selection;
    selection = this.get('selection');
    if (arguments.length === 2) {
      if (!value) {
        this.set('selection', value);
        return value;
      }
      if (Em.isArray(value)) {
        this.set('selection', value.map(function(v) {
          return moment(v);
        }));
      } else {
        this.set('selection', moment(value));
      }
      return value;
    } else {
      if (!selection) {
        if (this.get('dateRange')) {
          return [];
        } else {
          return null;
        }
      }
      if (Em.isArray(selection)) {
        return selection.map(function(date) {
          return date.format('X');
        });
      } else {
        return selection.format('X');
      }
    }
  }),
  calculateInitalValue: (function() {
    return this.notifyPropertyChange('value');
  }).on('didInsertElement'),
  isPlaceholder: Em.computed('selection', function() {
    var selection;
    selection = this.get('selection');
    if (selection && Em.isArray(selection) && selection.get('length') === 0) {
      return false;
    }
    if (!selection) {
      return false;
    }
    return true;
  }),
  actions: {
    openCalendar: function() {
      if (!this.get('popcalIsOpen')) {
        return popcalComponent.show({
          targetObject: this,
          isOpenBinding: 'targetObject.popcalIsOpen',
          selectionBinding: 'targetObject.selection',
          dateRangeBinding: 'targetObject.dateRange',
          disablePastBinding: 'targetObject.disablePast',
          disableFutureBinding: 'targetObject.disableFuture',
          maxPastDateBinding: 'targetObject.maxPastDate',
          maxFutureDateBinding: 'targetObject.maxFutureDate',
          disabledDatesBinding: 'targetObject.disabledDates',
          styleBinding: 'targetObject.calendarStyle',
          animationStyle: this.get('animationStyle')
        });
      }
    }
  },
  keyUp: function(event) {
    if (event.keyCode === 27) {
      this.send('closeCalendar', {
        forceClose: true
      });
    }
    if (event.which === 40) {
      event.preventDefault();
      return this.send('toggleCalendar');
    }
  },
  label: Em.computed('selection.@each', 'placeholder', function() {
    var endDate, label, selection, startDate;
    selection = this.get('selection');
    label = null;
    if (selection) {
      if (Em.isArray(selection)) {
        if (selection.get('length') < 2) {
          startDate = selection.get('firstObject');
          label = this.formatDateRange(startDate);
        } else {
          startDate = selection.get('firstObject');
          endDate = selection.get('lastObject');
          label = this.formatDateRange(startDate, endDate);
        }
      } else {
        label = this.formatDate(selection);
      }
    }
    return label || this.get('placeholder');
  }),
  formatDate: function(date) {
    if (!date) {
      return;
    }
    return date.twix(date, true).format(this.get('formatting'));
  },
  formatDateRange: function(startDate, endDate) {
    var formatting;
    if (!startDate) {
      return;
    }
    formatting = this.get('formatting');
    if (!endDate) {
      return startDate.twix(startDate, true).format(formatting) + ' -';
    }
    if (startDate && endDate) {
      if (endDate.isBefore(startDate)) {
        return endDate.twix(startDate, true).format(formatting);
      } else {
        return startDate.twix(endDate, true).format(formatting);
      }
    }
  },
  isEntered: true
});

exports["default"] = select;