"use strict";
var disabledSupport = require("../mixins/disabled-support")["default"] || require("../mixins/disabled-support");
var widthSupport = require("../mixins/width-support")["default"] || require("../mixins/width-support");
var errorSupport = require("../mixins/error-support")["default"] || require("../mixins/error-support");
var animationsDidComplete = require("../mixins/animations-did-complete")["default"] || require("../mixins/animations-did-complete");
var modalBehaviour = require("../mixins/modal-behaviour")["default"] || require("../mixins/modal-behaviour");
var select;

select = Em.Component.extend(disabledSupport, errorSupport, animationsDidComplete, modalBehaviour, widthSupport, {
  tagName: 'eui-selectdate',
  classNames: ['eui-selectdate'],
  classNameBindings: ['isDisabled:eui-disabled', 'isPlaceholder::eui-placeholder', 'class'],
  style: 'default',
  size: 'medium',
  dateRange: false,
  formatting: {
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    dayFormat: "D"
  },
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
    toggleCalendar: function() {
      if (this.get('open')) {
        return this.send('closeCalendar');
      } else {
        return this.send('openCalendar');
      }
    },
    closeCalendar: function(options) {
      var closeCalendar, dateRange, selection;
      dateRange = this.get('dateRange');
      selection = this.get('selection');
      closeCalendar = false;
      if (dateRange) {
        if (selection && selection.get('length') > 1) {
          closeCalendar = true;
        } else if (selection && selection.get('length') === 1 && options && options.forceClose === true) {
          this.resetSelection();
          closeCalendar = true;
        } else if (selection.get('length') === 0 && options && options.forceClose === true) {
          closeCalendar = true;
        }
      } else if (selection) {
        closeCalendar = true;
      } else if (options && options.forceClose === true) {
        closeCalendar = true;
      }
      if (closeCalendar) {
        $(window).unbind('.emberui');
        return this.hide();
      }
    },
    openCalendar: function() {
      this.set('open', true);
      Ember.run.next(this, function() {
        return this.positionCalendar();
      });
      this.set('_selection', this.get('selection'));
      return Ember.run.next(this, function() {
        return $(window).on('click.emberui', (function(_this) {
          return function(event) {
            if (!_this.$('eui-calendar').find($(event.target)).length) {
              event.preventDefault();
              $(_this).off(event);
              return _this.send('closeCalendar', {
                forceClose: true
              });
            }
          };
        })(this));
      });
    }
  },
  positionCalendar: function() {
    return this.$().find('eui-calendar').position({
      my: "center top",
      at: "center bottom",
      of: this.$(),
      collision: 'flipfit'
    });
  },
  resetSelection: function() {
    return this.set('selection', this.get('_selection'));
  },
  keyDown: function(event) {
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