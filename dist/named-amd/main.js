define("emberui/components/eui-button",
  ["../mixins/style-support","../mixins/size-support","../mixins/disabled-support","../mixins/width-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var sizeSupport = __dependency2__["default"] || __dependency2__;
    var disabledSupport = __dependency3__["default"] || __dependency3__;
    var widthSupport = __dependency4__["default"] || __dependency4__;
    var button;

    button = Em.Component.extend(styleSupport, sizeSupport, disabledSupport, widthSupport, {
      classNameBindings: [':eui-button', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class'],
      tagName: 'eui-button',
      label: null,
      icon: null,
      trailingIcon: null,
      loading: null,
      disabled: null,
      action: null,
      "class": null,
      type: 'button',
      width: 'auto',
      click: function(event) {
        event.preventDefault();
        return this.sendAction('action', this.get('context'));
      }
    });

    __exports__["default"] = button;
  });define("emberui/components/eui-calendar",
  ["../mixins/style-support","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var calendar, cpFormatMoment;

    cpFormatMoment = function(key, format) {
      return Em.computed('key', function() {
        var date;
        date = this.get(key);
        if (date) {
          return date.format(format);
        } else {
          return null;
        }
      });
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
      continuousSelection: true,
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
            if (this.get('continuousSelection')) {
              if (this.get('_selection.length') === 1) {
                if (date.isSame(this.get('_selection.firstObject'))) {
                  return this.set('_selection', []);
                } else {
                  return this.addDateRange(this.get('_selection.firstObject'), date);
                }
              } else {
                return this.set('_selection', [date]);
              }
            } else {
              if (this.hasDate(date)) {
                return this.removeDate(date);
              } else {
                return this.addDate(date);
              }
            }
          } else {
            if (this.hasDate(date)) {
              return this.set('_selection', []);
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
      selection: Ember.computed('_selection', function(key, value) {
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
      }),
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
      addDateRange: function(startDate, endDate) {
        var day, _results, _results1;
        day = moment(startDate);
        if (endDate.isBefore(startDate)) {
          day.subtract('days', 1);
          _results = [];
          while (!day.isBefore(endDate)) {
            this.addDate(moment(day));
            _results.push(day.subtract('days', 1));
          }
          return _results;
        } else {
          day.add('days', 1);
          _results1 = [];
          while (!day.isAfter(endDate)) {
            this.addDate(moment(day));
            _results1.push(day.add('days', 1));
          }
          return _results1;
        }
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
  });define("emberui/components/eui-checkbox",
  ["../mixins/error-support","../mixins/style-support","../mixins/size-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var errorSupport = __dependency1__["default"] || __dependency1__;
    var styleSupport = __dependency2__["default"] || __dependency2__;
    var sizeSupport = __dependency3__["default"] || __dependency3__;
    var checkbox;

    checkbox = Em.Component.extend(errorSupport, styleSupport, sizeSupport, {
      classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class'],
      tagName: 'eui-checkbox',
      value: false,
      disabled: false,
      click: function() {
        if (!this.get('disabled')) {
          return this.toggleProperty('value');
        }
      }
    });

    __exports__["default"] = checkbox;
  });define("emberui/components/eui-dropbutton",
  ["../mixins/style-support","../mixins/size-support","../components/eui-poplist","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var sizeSupport = __dependency2__["default"] || __dependency2__;
    var poplistComponent = __dependency3__["default"] || __dependency3__;
    var dropbutton;

    dropbutton = Em.Component.extend(styleSupport, sizeSupport, {
      tagName: 'eui-dropbutton',
      classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton'],
      poplistIsOpen: false,
      listWidth: 'auto',
      primaryAction: Em.computed('options', function() {
        return this.get('options').findBy('primary', true);
      }),
      peformSecondaryAction: (function() {
        var action;
        action = this.get('selection.action');
        if (action) {
          this.triggerAction({
            action: action
          });
        }
        return this.set('selection', null);
      }).observes('selection'),
      optionsWithoutPrimaryAction: Ember.computed.filter('options', function(option) {
        return !option.primary;
      }),
      actions: {
        toggleWindow: function() {
          if (!this.get('poplistIsOpen')) {
            return poplistComponent.show({
              targetObject: this,
              isOpenBinding: 'targetObject.poplistIsOpen',
              selectionBinding: 'targetObject.selection',
              optionsBinding: 'targetObject.optionsWithoutPrimaryAction',
              labelPath: 'label',
              style: 'bubble',
              listWidth: this.get('listWidth')
            });
          }
        },
        primaryAction: function() {
          return this.sendAction('primaryAction.action', this);
        }
      }
    });

    __exports__["default"] = dropbutton;
  });define("emberui/components/eui-input",
  ["../mixins/error-support","../mixins/text-support","../mixins/style-support","../mixins/size-support","../mixins/width-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var errorSupport = __dependency1__["default"] || __dependency1__;
    var textSupport = __dependency2__["default"] || __dependency2__;
    var styleSupport = __dependency3__["default"] || __dependency3__;
    var sizeSupport = __dependency4__["default"] || __dependency4__;
    var widthSupport = __dependency5__["default"] || __dependency5__;
    var input;

    input = Em.Component.extend(errorSupport, textSupport, styleSupport, sizeSupport, widthSupport, {
      classNameBindings: [':eui-input'],
      tagName: 'eui-input',
      maxlength: null
    });

    __exports__["default"] = input;
  });define("emberui/components/eui-modal",
  ["../mixins/style-support","../mixins/animations-did-complete","../templates/eui-modal","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var animationsDidComplete = __dependency2__["default"] || __dependency2__;
    var modalLayout = __dependency3__["default"] || __dependency3__;
    var modal;

    modal = Em.Component.extend(styleSupport, animationsDidComplete, {
      layout: modalLayout,
      tagName: 'eui-modal',
      classNames: ['eui-modal'],
      classNameBindings: ['class', 'isClosing:eui-closing'],
      attributeBindings: ['tabindex'],
      "class": null,
      previousFocus: null,
      tabindex: 0,
      programmatic: false,
      isClosing: false,
      renderModal: false,
      open: Ember.computed('renderModal', function(key, value) {
        if (arguments.length === 2) {
          if (value) {
            this.set('renderModal', value);
          } else {
            if (this.get('renderModal')) {
              this.hide();
            }
          }
          return value;
        } else {
          value = this.get('renderModal');
          return value;
        }
      }),
      didInsertElement: function() {
        if (this.get('programmatic')) {
          this.set('previousFocus', $(document.activeElement));
          this.$().focus();
          return $('body').addClass('eui-modal-open');
        }
      },
      didOpenModal: (function() {
        if (this.get('renderModal')) {
          this.$().focus();
          return $('body').addClass('eui-modal-open');
        }
      }).observes('renderModal'),
      hide: function() {
        this.set('isClosing', true);
        return this.animationsDidComplete().then((function(_this) {
          return function() {
            return _this.remove();
          };
        })(this));
      },
      remove: function() {
        var _ref;
        if ((_ref = this.get('previousFocus')) != null) {
          _ref.focus();
        }
        $('body').removeClass('eui-modal-open');
        if (this.get('programmatic')) {
          return this.destroy();
        } else {
          return this.setProperties({
            isClosing: false,
            renderModal: false
          });
        }
      },
      actions: {
        cancel: function(context) {
          this.sendAction('cancel', context);
          return this.hide();
        },
        accept: function(context) {
          this.sendAction('accept', context);
          return this.hide();
        }
      },
      keyDown: function(event) {
        if (event.keyCode === 9) {
          this.constrainTabNavigationToModal(event);
        }
        if (event.keyCode === 27) {
          this.sendAction('cancel');
          return this.hide();
        }
      },
      constrainTabNavigationToModal: function(event) {
        var activeElement, finalTabbable, leavingFinalTabbable, tabbable;
        activeElement = document.activeElement;
        tabbable = this.$(':tabbable');
        finalTabbable = tabbable[event.shiftKey && 'first' || 'last']()[0];
        leavingFinalTabbable = finalTabbable === activeElement || this.get('element') === activeElement;
        if (!leavingFinalTabbable) {
          return;
        }
        event.preventDefault();
        return tabbable[event.shiftKey && 'last' || 'first']()[0].focus();
      }
    });

    modal.reopenClass({
      show: function(options) {
        if (options == null) {
          options = {};
        }
        options.renderModal = true;
        options.programmatic = true;
        modal = this.create(options);
        modal.container = modal.get('targetObject.container');
        modal.appendTo('body');
        return modal;
      }
    });

    __exports__["default"] = modal;
  });define("emberui/components/eui-month",
  ["exports"],
  function(__exports__) {
    "use strict";
    var DATE_SLOT_HBS, containsDate, forEachSlot, month;

    DATE_SLOT_HBS = Handlebars.compile('<li class="{{classNames}}" data-date="{{jsonDate}}">' + '{{date}}' + '</li>');

    containsDate = function(dates, date) {
      if (!dates || !Em.get(dates, 'length')) {
        return false;
      }
      return dates.any(function(d) {
        return date.isSame(d, 'day');
      });
    };

    forEachSlot = function(month, iter) {
      var currentDay, day, firstDay, popCurrentDay, totalDays, week, _i, _j, _results;
      totalDays = month.daysInMonth();
      firstDay = month.clone().startOf('month').weekday();
      currentDay = 1;
      popCurrentDay = function() {
        if (currentDay > totalDays) {
          return null;
        } else {
          return moment([month.year(), month.month(), currentDay++]);
        }
      };
      _results = [];
      for (week = _i = 0; _i <= 6; week = ++_i) {
        for (day = _j = 0; _j <= 6; day = ++_j) {
          if (week === 0) {
            iter(day < firstDay ? null : popCurrentDay());
          } else {
            iter(currentDay <= totalDays ? popCurrentDay() : null);
          }
        }
        if (currentDay > totalDays) {
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    month = Em.Component.extend({
      tagName: 'ol',
      classNames: 'eui-month',
      month: null,
      selection: null,
      disabledDates: null,
      init: function() {
        this._super();
        if (!this.get('selection')) {
          throw 'you must provide selection to eui-month';
        }
      },
      click: function(event) {
        var $target;
        $target = $(event.target);
        if ($target.is('.eui-disabled')) {
          return;
        }
        if ($target.is('[data-date]')) {
          return this.sendAction('select', moment($target.data('date'), 'YYYY-MM-DD'));
        }
      },
      monthDidChange: (function() {
        return Em.run.scheduleOnce('afterRender', this, 'rerender');
      }).observes('month'),
      selectionDidChange: (function() {
        return Em.run.scheduleOnce('afterRender', this, 'setSelection');
      }).observes('selection.@each'),
      setSelection: function() {
        var date, dates, json, view, _i, _len, _results;
        dates = this.get('selection');
        view = this;
        json;
        if (this.state === !'inDOM') {
          return;
        }
        this.$('li').removeClass('eui-selected');
        _results = [];
        for (_i = 0, _len = dates.length; _i < _len; _i++) {
          date = dates[_i];
          json = date.format('YYYY-MM-DD');
          _results.push(view.$('[data-date="' + json + '"]').addClass('eui-selected'));
        }
        return _results;
      },
      didInsertElement: function() {
        return this.setSelection();
      },
      render: function(buff) {
        var renderSlot, view;
        month = this.get('month');
        view = this;
        if (!month) {
          return;
        }
        renderSlot = function(slot) {
          attrs;
          var attrs;
          if (slot) {
            attrs = {
              date: slot.format('D'),
              jsonDate: slot.format('YYYY-MM-DD'),
              classNames: ['eui-slot', 'eui-day']
            };
            view.applyOptionsForDate(attrs, slot);
            attrs.classNames = attrs.classNames.join(' ');
            return buff.push(DATE_SLOT_HBS(attrs));
          } else {
            return buff.push('<li class="eui-slot eui-empty"></li>');
          }
        };
        return forEachSlot(month, function(slot) {
          return renderSlot(slot);
        });
      },
      applyOptionsForDate: function(options, date) {
        var disabledDates, selection;
        disabledDates = this.get('disabledDates');
        selection = this.get('selection');
        if (moment().isSame(date, 'day')) {
          options.classNames.push('eui-today');
        }
        if (disabledDates && containsDate(disabledDates, date)) {
          options.classNames.push('eui-disabled');
        }
        if (selection && containsDate(selection, date)) {
          return options.classNames.push('eui-selected');
        }
      }
    });

    __exports__["default"] = month;
  });define("emberui/components/eui-poplist",
  ["../mixins/style-support","../mixins/animations-did-complete","../templates/eui-poplist","../templates/eui-poplist-option","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var animationsDidComplete = __dependency2__["default"] || __dependency2__;
    var poplistLayout = __dependency3__["default"] || __dependency3__;
    var itemViewClassTemplate = __dependency4__["default"] || __dependency4__;
    var poplist;

    poplist = Em.Component.extend(styleSupport, animationsDidComplete, {
      layout: poplistLayout,
      classNames: ['eui-poplist eui-animation'],
      classNameBindings: ['isOpen::eui-closing'],
      attributeBindings: ['tabindex'],
      tagName: 'eui-poplist',
      listWidth: null,
      listHeight: '80',
      listRowHeight: '20',
      labelPath: 'label',
      options: null,
      searchString: null,
      highlightedIndex: -1,
      previousFocus: null,
      highlighted: Ember.computed('highlightedIndex', 'filteredOptions', function(key, value) {
        var index, options;
        options = this.get('filteredOptions');
        if (arguments.length === 2) {
          index = options.indexOf(value);
          this.set('highlightedIndex', index);
          return value;
        } else {
          index = this.get('highlightedIndex');
          return options.objectAt(index);
        }
      }),
      hide: function() {
        this.setProperties({
          isOpen: false,
          highlightedIndex: -1
        });
        $(window).unbind('.emberui');
        this.$().unbind('.emberui');
        this.get('previousFocus').focus();
        $('body').removeClass('eui-poplist-open');
        return this.animationsDidComplete().then((function(_this) {
          return function() {
            return _this.destroy();
          };
        })(this));
      },
      didInsertElement: function() {
        this.set('isOpen', true);
        this.set('previousFocus', $(document.activeElement));
        Ember.run.next(this, function() {
          return this.focusOnSearch();
        });
        this.updateListWidthCss();
        Ember.run.next(this, function() {
          return this.scrollToSelection(this.get('options').indexOf(this.get('selection')), true);
        });
        return $('body').addClass('eui-poplist-open');
      },
      focusOnSearch: function() {
        return this.$().find('input:first').focus();
      },
      updateListWidthCss: function() {
        var listWidth;
        listWidth = this.get('listWidth');
        return this.$().css('width', listWidth);
      },
      searchStringDidChange: (function() {
        if (this.get('searchString')) {
          return this.set('highlightedIndex', 0);
        }
      }).observes('searchString'),
      filteredOptions: (function() {
        var escapedQuery, filteredOptions, labelPath, options, query, regex;
        options = this.get('options');
        query = this.get('searchString');
        if (!options) {
          return [];
        }
        if (!query) {
          return options;
        }
        labelPath = this.get('labelPath');
        escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        regex = new RegExp(escapedQuery, 'i');
        filteredOptions = options.filter(function(item, index, self) {
          var label;
          label = (typeof item.get === "function" ? item.get(labelPath) : void 0) || item[labelPath];
          if (label) {
            return regex.test(label);
          }
        });
        return filteredOptions;
      }).property('options.@each', 'labelPath', 'searchString'),
      hasNoOptions: Ember.computed.empty('filteredOptions'),
      optionsLengthDidChange: (function() {
        return this.updateListHeight();
      }).observes('filteredOptions.length'),
      updateListHeight: function() {
        var optionCount, rowHeight;
        optionCount = this.get('filteredOptions.length');
        rowHeight = this.get('listRowHeight');
        if (optionCount <= 12) {
          return this.set('listHeight', optionCount * rowHeight);
        } else {
          return this.set('listHeight', 10 * rowHeight);
        }
      },
      scrollToSelection: function(index, center) {
        var $listView, endIndex, listView, numRows, startIndex;
        $listView = this.$('.ember-list-view');
        listView = Ember.View.views[$listView.attr('id')];
        startIndex = listView._startingIndex();
        numRows = listView._childViewCount() - 1;
        endIndex = startIndex + numRows;
        if (index === 0) {
          return $listView.scrollTop(0);
        } else if (index < startIndex) {
          return $listView.scrollTop(index * this.get('listRowHeight'));
        } else if (index >= endIndex) {
          if (center) {
            return $listView.scrollTop((index - (numRows / 2)) * this.get('listRowHeight'));
          } else {
            return $listView.scrollTop((index - numRows + 1) * this.get('listRowHeight'));
          }
        }
      },
      KEY_MAP: {
        27: 'escapePressed',
        13: 'enterPressed',
        38: 'upArrowPressed',
        40: 'downArrowPressed'
      },
      keyDown: function(event) {
        var keyMap, method, _ref;
        keyMap = this.get('KEY_MAP');
        method = keyMap[event.which];
        if (method) {
          return (_ref = this.get(method)) != null ? _ref.apply(this, arguments) : void 0;
        }
      },
      escapePressed: function(event) {
        return this.hide();
      },
      enterPressed: function(event) {
        event.preventDefault();
        this.set('selection', this.get('highlighted'));
        return this.hide();
      },
      downArrowPressed: function(event) {
        event.preventDefault();
        return this.adjustHighlight(1);
      },
      upArrowPressed: function(event) {
        event.preventDefault();
        return this.adjustHighlight(-1);
      },
      adjustHighlight: function(indexAdjustment) {
        var highlightedIndex, newIndex, options, optionsLength;
        highlightedIndex = this.get('highlightedIndex');
        options = this.get('filteredOptions');
        optionsLength = options.get('length');
        newIndex;
        if (highlightedIndex >= optionsLength) {
          if (indexAdjustment === 1) {
            newIndex = 0;
          }
        } else {
          newIndex = highlightedIndex + indexAdjustment;
          if (newIndex >= optionsLength) {
            newIndex = optionsLength - 1;
          } else if (newIndex < 0) {
            newIndex = 0;
          }
        }
        this.scrollToSelection(newIndex);
        return this.set('highlightedIndex', newIndex);
      },
      listView: Ember.ListView.extend({
        css: {
          position: 'relative',
          overflow: 'auto',
          '-webkit-overflow-scrolling': 'touch',
          'overflow-scrolling': 'touch'
        },
        classNames: ['eui-options'],
        height: Ember.computed.alias('controller.listHeight'),
        rowHeight: Ember.computed.alias('controller.listRowHeight'),
        didInsertElement: function() {
          this._super();
          return this.$().bind('mousewheel.emberui DOMMouseScroll.emberui', (function(_this) {
            return function(e) {
              var scrollTo;
              e.preventDefault();
              scrollTo = _this.get('scrollTop');
              if (e.type === 'mousewheel') {
                scrollTo += e.originalEvent.wheelDelta * -1;
              } else if (e.type === 'DOMMouseScroll') {
                scrollTo += 40 * e.originalEvent.detail;
              }
              return _this.scrollTo(scrollTo);
            };
          })(this));
        },
        itemViewClass: Ember.ListItemView.extend({
          classNames: ['eui-option'],
          classNameBindings: ['isHighlighted:eui-hover', 'isSelected:eui-selected'],
          template: itemViewClassTemplate,
          labelPathDidChange: (function() {
            var labelPath;
            labelPath = this.get('controller.labelPath');
            Ember.defineProperty(this, 'label', Ember.computed.alias("content." + labelPath));
            return this.notifyPropertyChange('label');
          }).observes('content', 'controller.labelPath'),
          initializeLabelPath: (function() {
            return this.labelPathDidChange();
          }).on('init'),
          updateContext: function(context) {
            this._super(context);
            return this.set('content', context);
          },
          isHighlighted: Ember.computed('controller.highlighted', 'content', function() {
            return this.get('controller.highlighted') === this.get('content');
          }),
          isSelected: Ember.computed('controller.selection', 'content', function() {
            return this.get('controller.selection') === this.get('content');
          }),
          click: function() {
            this.set('controller.selection', this.get('content'));
            return this.get('controller').hide();
          },
          mouseEnter: function() {
            var hoveredOption, options;
            options = this.get('controller.filteredOptions');
            hoveredOption = this.get('content');
            return this.set('controller.highlighted', hoveredOption);
          }
        })
      })
    });

    poplist.reopenClass({
      show: function(options) {
        if (options == null) {
          options = {};
        }
        poplist = this.create(options);
        poplist.container = poplist.get('targetObject.container');
        poplist.appendTo('.ember-application');
        poplist.updateListHeight();
        Ember.run.next(this, function() {
          return this.position(options.targetObject, poplist);
        });
        return poplist;
      },
      position: function(targetObject, poplist) {
        var element, elementHeight, elementPositionLeft, elementPositionTop, elementWidth, elementWidthMinuspoplistPadding, offset, poplistElement, poplistHorizontalPadding, poplistPositionLeft, poplistPositionTop, poplistWidth, windowScrollLeft, windowScrollTop;
        element = targetObject.$();
        poplistElement = poplist.$();
        offset = element.offset();
        elementWidthMinuspoplistPadding = element.width() - parseFloat(poplistElement.css('paddingLeft')) - parseFloat(poplistElement.css('paddingRight'));
        poplistElement.css('min-width', elementWidthMinuspoplistPadding);
        elementPositionTop = offset.top - element.scrollTop();
        elementPositionLeft = offset.left - element.scrollLeft();
        elementHeight = element.height();
        elementWidth = element.width();
        poplistWidth = poplistElement.width();
        poplistHorizontalPadding = parseFloat(poplistElement.css('paddingLeft')) + parseFloat(poplistElement.css('paddingRight'));
        windowScrollTop = $(window).scrollTop();
        windowScrollLeft = $(window).scrollLeft();
        poplistPositionTop = elementPositionTop + elementHeight - windowScrollTop;
        poplistPositionLeft = elementPositionLeft + elementWidth - poplistWidth - poplistHorizontalPadding - windowScrollLeft;
        poplistElement.css('top', poplistPositionTop);
        poplistElement.css('left', poplistPositionLeft);
        $(window).bind('scroll.emberui', function() {
          return poplist.hide();
        });
        return $(window).bind('click.emberui', function(event) {
          if (!$(event.target).parents('.eui-poplist').length) {
            event.preventDefault();
            return poplist.hide();
          }
        });
      }
    });

    __exports__["default"] = poplist;
  });define("emberui/components/eui-select",
  ["../components/eui-poplist","../mixins/disabled-support","../mixins/error-support","../mixins/width-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var poplistComponent = __dependency1__["default"] || __dependency1__;
    var disabledSupport = __dependency2__["default"] || __dependency2__;
    var errorSupport = __dependency3__["default"] || __dependency3__;
    var widthSupport = __dependency4__["default"] || __dependency4__;
    var select;

    select = Em.Component.extend(disabledSupport, errorSupport, widthSupport, {
      tagName: 'eui-select',
      classNames: ['eui-select'],
      classNameBindings: ['isDisabled:eui-disabled', 'selection::eui-placeholder', 'class'],
      style: 'default',
      size: 'medium',
      poplistIsOpen: false,
      required: false,
      options: [],
      labelPath: 'label',
      valuePath: 'value',
      _selection: null,
      listWidth: 'auto',
      nullValue: new Object(),
      optionsWithBlank: (function() {
        var options, paddedOptions;
        options = this.get('options');
        paddedOptions = options.slice(0);
        if (!this.get('required')) {
          paddedOptions.unshift(this.get('nullValue'));
        }
        return paddedOptions;
      }).property('options.@each', 'required'),
      label: (function() {
        var labelPath;
        labelPath = this.get('labelPath');
        return this.get("selection." + labelPath) || this.get('placeholder');
      }).property('selection', 'placeholder', 'labelPath'),
      selection: Ember.computed('_selection', function(key, value) {
        var nullValue, selection;
        if (arguments.length === 2) {
          this.set('_selection', value);
          return value;
        } else {
          selection = this.get('_selection');
          nullValue = this.get('nullValue');
          if (selection === nullValue) {
            return null;
          } else {
            return selection;
          }
        }
      }),
      value: Ember.computed('selection', 'valuePath', function(key, value) {
        var selection, valuePath;
        if (arguments.length === 2) {
          valuePath = this.get('valuePath');
          if (valuePath) {
            selection = this.get('options').findProperty(valuePath, value);
          }
          this.set('selection', selection || value);
          return value;
        } else {
          valuePath = this.get('valuePath');
          if (valuePath) {
            return this.get("selection." + valuePath);
          } else {
            return null;
          }
        }
      }),
      initialization: (function() {
        var labelPath, value, valuePath;
        if (this.get('options') === void 0) {
          Ember.Logger.error('EmberUI: eui-select options paramater has undefined value');
          return;
        }
        labelPath = 'selection.' + this.get('labelPath');
        this.addObserver(labelPath, function() {
          return this.notifyPropertyChange('label');
        });
        valuePath = this.get('valuePath');
        value = this.get('value');
        if (valuePath) {
          value = this.get('options').findProperty(valuePath, value);
        }
        return this.set('_selection', value || this.get('nullValue'));
      }).on('init'),
      click: function() {
        if (!this.get('poplistIsOpen')) {
          return poplistComponent.show({
            targetObject: this,
            isOpenBinding: 'targetObject.poplistIsOpen',
            selectionBinding: 'targetObject._selection',
            optionsBinding: 'targetObject.optionsWithBlank',
            labelPathBinding: 'targetObject.labelPath',
            style: 'flyin',
            listWidth: this.get('listWidth')
          });
        }
      },
      keyDown: function(event) {
        if (event.which === 40) {
          event.preventDefault();
          return this.click();
        }
      },
      isEntered: true
    });

    __exports__["default"] = select;
  });define("emberui/components/eui-textarea",
  ["../mixins/error-support","../mixins/text-support","../mixins/style-support","../mixins/size-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var errorSupport = __dependency1__["default"] || __dependency1__;
    var textSupport = __dependency2__["default"] || __dependency2__;
    var styleSupport = __dependency3__["default"] || __dependency3__;
    var sizeSupport = __dependency4__["default"] || __dependency4__;
    var textarea;

    textarea = Em.Component.extend(errorSupport, textSupport, styleSupport, sizeSupport, {
      classNameBindings: [':eui-textarea'],
      attributeBindings: ['computedWidthAndHeight:style'],
      tagName: 'eui-textarea',
      height: null,
      computedWidthAndHeight: Em.computed('size', 'width', 'height', function() {
        var height, heights, width, widths;
        widths = {
          tiny: '100px',
          small: '150px',
          medium: '200px',
          large: '250px'
        };
        heights = {
          tiny: '50px',
          small: '75px',
          medium: '100px',
          large: '125px'
        };
        width = this.get('width') || widths[this.get('size')] || widths['medium'];
        height = this.get('height') || heights[this.get('size')] || heights['medium'];
        return "width: " + width + "; height: " + height + ";";
      })
    });

    __exports__["default"] = textarea;
  });define("emberui",
  ["./components/eui-button","./templates/eui-button","./components/eui-checkbox","./templates/eui-checkbox","./components/eui-dropbutton","./templates/eui-dropbutton","./components/eui-input","./templates/eui-input","./components/eui-modal","./templates/eui-modal","./components/eui-poplist","./templates/eui-poplist","./templates/eui-poplist-option","./components/eui-select","./templates/eui-select","./components/eui-textarea","./templates/eui-textarea","./components/eui-month","./components/eui-calendar","./templates/eui-calendar","./utilities/tabbable-selector","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __exports__) {
    "use strict";
    /*!
    EmberUI (c) 2014 Jaco Joubert
    License: https://github.com/emberui/emberui/blob/master/LICENSE
    */

    var EuiButtonComponent = __dependency1__["default"] || __dependency1__;
    var EuiButtonTemplate = __dependency2__["default"] || __dependency2__;

    var EuiCheckboxComponent = __dependency3__["default"] || __dependency3__;
    var EuiCheckboxTemplate = __dependency4__["default"] || __dependency4__;

    var EuiDropbuttonComponent = __dependency5__["default"] || __dependency5__;
    var EuiDropbuttonTemplate = __dependency6__["default"] || __dependency6__;

    var EuiInputComponent = __dependency7__["default"] || __dependency7__;
    var EuiInputTemplate = __dependency8__["default"] || __dependency8__;

    var EuiModalComponent = __dependency9__["default"] || __dependency9__;
    var EuiModalTemplate = __dependency10__["default"] || __dependency10__;

    var EuiPoplistComponent = __dependency11__["default"] || __dependency11__;
    var EuiPoplistTemplate = __dependency12__["default"] || __dependency12__;
    var EuiPoplistOptionTemplate = __dependency13__["default"] || __dependency13__;

    var EuiSelectComponent = __dependency14__["default"] || __dependency14__;
    var EuiSelectTemplate = __dependency15__["default"] || __dependency15__;

    var EuiTextareaComponent = __dependency16__["default"] || __dependency16__;
    var EuiTextareaTemplate = __dependency17__["default"] || __dependency17__;

    var EuiMonthComponent = __dependency18__["default"] || __dependency18__;

    var EuiCalendarComponent = __dependency19__["default"] || __dependency19__;
    var EuiCalendarTemplate = __dependency20__["default"] || __dependency20__;


    Ember.Application.initializer({
      name: 'emberui',

      initialize: function(container) {
        container.register('template:components/eui-button', EuiButtonTemplate);
        container.register('component:eui-button', EuiButtonComponent);

        container.register('template:components/eui-checkbox', EuiCheckboxTemplate);
        container.register('component:eui-checkbox', EuiCheckboxComponent);

        container.register('template:components/eui-dropbutton', EuiDropbuttonTemplate);
        container.register('component:eui-dropbutton', EuiDropbuttonComponent);

        container.register('template:components/eui-input', EuiInputTemplate);
        container.register('component:eui-input', EuiInputComponent);

        container.register('template:components/eui-modal', EuiModalTemplate);
        container.register('component:eui-modal', EuiModalComponent);

        container.register('template:components/eui-poplist', EuiPoplistTemplate);
        container.register('template:components/eui-poplist-opion', EuiPoplistOptionTemplate);
        container.register('component:eui-poplist', EuiPoplistComponent);

        container.register('template:components/eui-select', EuiSelectTemplate);
        container.register('component:eui-select', EuiSelectComponent);

        container.register('template:components/eui-textarea', EuiTextareaTemplate);
        container.register('component:eui-textarea', EuiTextareaComponent);

        container.register('component:eui-month', EuiMonthComponent);

        container.register('template:components/eui-calendar', EuiCalendarTemplate);
        container.register('component:eui-calendar', EuiCalendarComponent);
      }
    });

    __exports__.EuiButtonComponent = EuiButtonComponent;
    __exports__.EuiCheckboxComponent = EuiCheckboxComponent;
    __exports__.EuiDropbuttonComponent = EuiDropbuttonComponent;
    __exports__.EuiInputComponent = EuiInputComponent;
    __exports__.EuiInputTemplate = EuiInputTemplate;
    __exports__.EuiModalComponent = EuiModalComponent;
    __exports__.EuiPoplistComponent = EuiPoplistComponent;
    __exports__.EuiSelectComponent = EuiSelectComponent;
    __exports__.EuiTextareaComponent = EuiTextareaComponent;
    __exports__.EuiMonthComponent = EuiMonthComponent;
    __exports__.EuiCalendarComponent = EuiCalendarComponent;
  });define("emberui/mixins/animations-did-complete",
  ["exports"],
  function(__exports__) {
    "use strict";
    var animationsDidComplete;

    animationsDidComplete = Em.Mixin.create({
      animationsDidComplete: function() {
        var promise;
        promise = new Em.RSVP.Promise((function(_this) {
          return function(resolve, reject) {
            var animatedElements, animation, cssRule, domPrefixes, element, elements, prefix, primaryElement, _i, _j, _len, _len1;
            animation = false;
            primaryElement = _this.$();
            animatedElements = _this.$().find('.eui-animation');
            elements = $.merge(primaryElement, animatedElements);
            domPrefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
            for (_i = 0, _len = elements.length; _i < _len; _i++) {
              element = elements[_i];
              if (animation) {
                break;
              }
              for (_j = 0, _len1 = domPrefixes.length; _j < _len1; _j++) {
                prefix = domPrefixes[_j];
                cssRule = $(element).css(prefix + 'animationName');
                if (cssRule && cssRule !== 'none') {
                  animation = true;
                }
                if (animation) {
                  break;
                }
              }
            }
            if (animation) {
              return _this.$().one('webkitAnimationEnd mozAnimationEnd oanimationend msAnimationEnd animationend', function() {
                return resolve(_this);
              });
            } else {
              return resolve(_this);
            }
          };
        })(this));
        return promise;
      }
    });

    __exports__["default"] = animationsDidComplete;
  });define("emberui/mixins/disabled-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var disabledsupport;

    disabledsupport = Em.Mixin.create({
      classNameBindings: ['isDisabled:eui-disabled'],
      disabled: false,
      isDisabled: Em.computed('disabled', 'loading', function() {
        if (this.get('disabled') || this.get('loading')) {
          return true;
        }
      })
    });

    __exports__["default"] = disabledsupport;
  });define("emberui/mixins/error-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var errorSupport;

    errorSupport = Em.Mixin.create({
      classNameBindings: ['errorState:eui-error'],
      forceErrorCheck: false,
      focusIn: function() {
        return this.set("isEntered", false);
      },
      focusOut: function() {
        return this.set("isEntered", true);
      },
      errorMessage: Em.computed('errorState', 'error', function() {
        var error;
        error = this.get('error');
        if (this.get('errorState') && typeof error === 'string') {
          return error;
        } else {
          return null;
        }
      }),
      errorState: Em.computed('isEntered', 'forceErrorCheck', 'error', 'value', function() {
        var errorState;
        errorState = this._errorState();
        this.set('_previousErrorState', errorState);
        return errorState;
      }),
      _errorState: function() {
        switch (this.get('_previousErrorState')) {
          case void 0:
            if (Em.isBlank(this.get('value')) && !this.get('forceErrorCheck')) {
              return false;
            }
            break;
          case false:
            if (!this.get('isEntered') && !this.get('forceErrorCheck')) {
              return false;
            }
        }
        return !!this.get('error');
      }
    });

    __exports__["default"] = errorSupport;
  });define("emberui/mixins/size-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var sizesupport;

    sizesupport = Em.Mixin.create({
      classNameBindings: ['computedSize'],
      size: 'medium',
      computedSize: Em.computed('size', function() {
        return 'eui-' + this.get('size');
      })
    });

    __exports__["default"] = sizesupport;
  });define("emberui/mixins/style-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var stylesupport;

    stylesupport = Em.Mixin.create({
      classNameBindings: ['computedStyle'],
      style: 'default',
      computedStyle: Em.computed(function() {
        return 'eui-' + this.get('style');
      }).property('style')
    });

    __exports__["default"] = stylesupport;
  });define("emberui/mixins/text-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var textsupport;

    textsupport = Em.Mixin.create({
      tagName: 'div',
      classNameBindings: ['computedSize', 'computedStyle', 'class'],
      width: null,
      name: null,
      disabled: null,
      tabindex: null,
      placeholder: null,
      value: null,
      "class": null,
      required: null,
      error: null,
      inputId: null,
      setInputId: (function() {
        return this.set('inputId', this.$('input').attr('id') || this.$('textarea').attr('id'));
      }).on('didInsertElement'),
      placeholderVisible: Em.computed('placeholder', 'value', function() {
        var placeholder, value;
        placeholder = this.get('placeholder');
        value = this.get('value');
        if (placeholder && !value) {
          return true;
        }
      })
    });

    __exports__["default"] = textsupport;
  });define("emberui/mixins/width-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var widthsupport;

    widthsupport = Em.Mixin.create({
      attributeBindings: ['computedWidth:style'],
      computedWidth: Em.computed('size', 'width', function() {
        var width, widths;
        widths = {
          tiny: '100px',
          small: '150px',
          medium: '200px',
          large: '250px'
        };
        width = this.get('width') || widths[this.get('size')] || widths['medium'];
        return "width: " + width + ";";
      })
    });

    __exports__["default"] = widthsupport;
  });define("emberui/templates/eui-button",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n        <b ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': ("icon")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("></b>\n      ");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n        <b ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': ("trailingIcon")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("></b>\n      ");
      return buffer;
      }

    function program5(depth0,data) {
      
      
      data.buffer.push("\n      <ul class=\"eui-loading-animation\">\n        <li></li>\n        <li></li>\n        <li></li>\n      </ul>\n    ");
      }

      data.buffer.push("<button ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'disabled': ("isDisabled"),
        'type': ("type")
      },hashTypes:{'disabled': "STRING",'type': "STRING"},hashContexts:{'disabled': depth0,'type': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("></button>\n\n<div class=\"eui-button-form\">\n  <div class=\"eui-wrapper\">\n    <i>\n      ");
      stack1 = helpers['if'].call(depth0, "icon", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n      ");
      stack1 = helpers._triageMustache.call(depth0, "label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n      ");
      stack1 = helpers['if'].call(depth0, "trailingIcon", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </i>\n\n    ");
      stack1 = helpers['if'].call(depth0, "loading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n  </div>\n</div>\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-calendar",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    <div class=\"eui-month-container\">\n      <header>\n        ");
      stack1 = helpers._triageMustache.call(depth0, "prevMonthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </header>\n      <div class=\"eui-month-frame\">\n        <ol class=\"eui-daysofweek\">\n          <li class=\"eui-nameofday\">Sun</li>\n          <li class=\"eui-nameofday\">Mon</li>\n          <li class=\"eui-nameofday\">Tue</li>\n          <li class=\"eui-nameofday\">Wed</li>\n          <li class=\"eui-nameofday\">Thu</li>\n          <li class=\"eui-nameofday\">Fri</li>\n          <li class=\"eui-nameofday\">Sat</li>\n        </ol>\n        ");
      data.buffer.push(escapeExpression((helper = helpers['eui-month'] || (depth0 && depth0['eui-month']),options={hash:{
        'month': ("prevMonth"),
        'selection': ("_selection"),
        'disabledDates': ("disabledDates"),
        'select': ("dateSelected")
      },hashTypes:{'month': "ID",'selection': "ID",'disabledDates': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selection': depth0,'disabledDates': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-month", options))));
      data.buffer.push("\n      </div>\n    </div>\n  ");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    <div class=\"eui-month-container\">\n      <header>\n        ");
      stack1 = helpers._triageMustache.call(depth0, "nextMonthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </header>\n      <div class=\"eui-month-frame\">\n        <ol class=\"eui-daysofweek\">\n          <li class=\"eui-nameofday\">Sun</li>\n          <li class=\"eui-nameofday\">Mon</li>\n          <li class=\"eui-nameofday\">Tue</li>\n          <li class=\"eui-nameofday\">Wed</li>\n          <li class=\"eui-nameofday\">Thu</li>\n          <li class=\"eui-nameofday\">Fri</li>\n          <li class=\"eui-nameofday\">Sat</li>\n        </ol>\n        ");
      data.buffer.push(escapeExpression((helper = helpers['eui-month'] || (depth0 && depth0['eui-month']),options={hash:{
        'month': ("nextMonth"),
        'selection': ("_selection"),
        'disabledDates': ("disabledDates"),
        'select': ("dateSelected")
      },hashTypes:{'month': "ID",'selection': "ID",'disabledDates': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selection': depth0,'disabledDates': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-month", options))));
      data.buffer.push("\n      </div>\n    </div>\n  ");
      return buffer;
      }

      data.buffer.push("<div class=\"eui-calendar-wrapper\">\n  <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "prev", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'disabled': ("isPrevDisabled")
      },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(" class=\"eui-previous\"></button>\n  <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'disabled': ("isNextDisabled")
      },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(" class=\"eui-next\"></button>\n\n  ");
      stack1 = helpers['if'].call(depth0, "showPrevMonth", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n  <div class=\"eui-month-container\">\n    <header>\n      ");
      stack1 = helpers._triageMustache.call(depth0, "monthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </header>\n    <div class=\"eui-month-frame\">\n      <ol class=\"eui-daysofweek\">\n        <li class=\"eui-nameofday\">Sun</li>\n        <li class=\"eui-nameofday\">Mon</li>\n        <li class=\"eui-nameofday\">Tue</li>\n        <li class=\"eui-nameofday\">Wed</li>\n        <li class=\"eui-nameofday\">Thu</li>\n        <li class=\"eui-nameofday\">Fri</li>\n        <li class=\"eui-nameofday\">Sat</li>\n      </ol>\n      ");
      data.buffer.push(escapeExpression((helper = helpers['eui-month'] || (depth0 && depth0['eui-month']),options={hash:{
        'month': ("month"),
        'selection': ("_selection"),
        'disabledDates': ("disabledDates"),
        'select': ("dateSelected")
      },hashTypes:{'month': "ID",'selection': "ID",'disabledDates': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selection': depth0,'disabledDates': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-month", options))));
      data.buffer.push("\n    </div>\n  </div>\n\n  ");
      stack1 = helpers['if'].call(depth0, "showNextMonth", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n</div>\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-checkbox",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        ");
      stack1 = helpers._triageMustache.call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </p>\n    </div>\n  </div>\n");
      return buffer;
      }

      data.buffer.push("<input type=\"checkbox\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'checked': ("value"),
        'disabled': ("disabled")
      },hashTypes:{'checked': "ID",'disabled': "ID"},hashContexts:{'checked': depth0,'disabled': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(" />\n\n<div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":eui-checkbox-form disabled:eui-disabled:eui-enabled")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n  <div class=\"eui-wrapper\">\n    <i class=\"eui-icon\"></i>\n  </div>\n</div>\n\n");
      stack1 = helpers._triageMustache.call(depth0, "label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n");
      stack1 = helpers['if'].call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-dropbutton",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n  ");
      data.buffer.push(escapeExpression((helper = helpers['eui-button'] || (depth0 && depth0['eui-button']),options={hash:{
        'label': ("primaryAction.label"),
        'style': ("view.style"),
        'size': ("view.size"),
        'icon': ("view.icon"),
        'loading': ("view.loading"),
        'disabled': ("view.disabled"),
        'class': ("eui-primaryaction"),
        'action': ("primaryAction")
      },hashTypes:{'label': "ID",'style': "ID",'size': "ID",'icon': "ID",'loading': "ID",'disabled': "ID",'class': "STRING",'action': "STRING"},hashContexts:{'label': depth0,'style': depth0,'size': depth0,'icon': depth0,'loading': depth0,'disabled': depth0,'class': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-button", options))));
      data.buffer.push("\n\n  ");
      data.buffer.push(escapeExpression((helper = helpers['eui-button'] || (depth0 && depth0['eui-button']),options={hash:{
        'style': ("view.style"),
        'size': ("view.size"),
        'icon': ("fa fa-caret-down"),
        'loading': (false),
        'disabled': ("view.disabled"),
        'classBinding': (":eui-trigger poplistIsOpen:eui-active"),
        'action': ("toggleWindow")
      },hashTypes:{'style': "ID",'size': "ID",'icon': "STRING",'loading': "BOOLEAN",'disabled': "ID",'classBinding': "STRING",'action': "STRING"},hashContexts:{'style': depth0,'size': depth0,'icon': depth0,'loading': depth0,'disabled': depth0,'classBinding': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-button", options))));
      data.buffer.push("\n\n");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n  ");
      data.buffer.push(escapeExpression((helper = helpers['eui-button'] || (depth0 && depth0['eui-button']),options={hash:{
        'label': ("view.label"),
        'style': ("view.style"),
        'size': ("view.size"),
        'icon': ("view.icon"),
        'trailingIcon': ("fa fa-caret-down"),
        'loading': ("view.loading"),
        'disabled': ("view.disabled"),
        'classBinding': ("poplistIsOpen:eui-active"),
        'action': ("toggleWindow")
      },hashTypes:{'label': "ID",'style': "ID",'size': "ID",'icon': "ID",'trailingIcon': "STRING",'loading': "ID",'disabled': "ID",'classBinding': "STRING",'action': "STRING"},hashContexts:{'label': depth0,'style': depth0,'size': depth0,'icon': depth0,'trailingIcon': depth0,'loading': depth0,'disabled': depth0,'classBinding': depth0,'action': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-button", options))));
      data.buffer.push("\n\n");
      return buffer;
      }

      stack1 = helpers['if'].call(depth0, "primaryAction", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-input",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n    <label ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'for': ("inputId")
      },hashTypes:{'for': "ID"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">");
      stack1 = helpers._triageMustache.call(depth0, "placeholder", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</label>\n  ");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        ");
      stack1 = helpers._triageMustache.call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </p>\n    </div>\n  </div>\n");
      return buffer;
      }

      data.buffer.push("<div class=\"eui-wrapper\">\n  ");
      stack1 = helpers['if'].call(depth0, "placeholderVisible", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n  ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'type': ("type"),
        'value': ("value"),
        'name': ("name"),
        'disabled': ("disabled"),
        'maxlength': ("maxlength"),
        'tabindex': ("tabindex")
      },hashTypes:{'type': "ID",'value': "ID",'name': "ID",'disabled': "ID",'maxlength': "ID",'tabindex': "ID"},hashContexts:{'type': depth0,'value': depth0,'name': depth0,'disabled': depth0,'maxlength': depth0,'tabindex': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n</div>\n\n");
      stack1 = helpers['if'].call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-modal",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n  <div class=\"eui-modal-wrapper\">\n\n    <div class=\"eui-modal-table\">\n      <div class=\"eui-modal-cell\">\n\n        <div class=\"eui-modalobject eui-animation\">\n          <div class=\"eui-modalobject-wrapper\">\n            ");
      stack1 = helpers['if'].call(depth0, "programmatic", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n    <div class=\"eui-overlay eui-animation\"></div>\n  </div>\n");
      return buffer;
      }
    function program2(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n              ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "contentViewClass", {hash:{
        'contentBinding': ("content")
      },hashTypes:{'contentBinding': "STRING"},hashContexts:{'contentBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n            ");
      return buffer;
      }

    function program4(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n              ");
      stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n            ");
      return buffer;
      }

      stack1 = helpers['if'].call(depth0, "renderModal", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-poplist-option",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1;


      stack1 = helpers._triageMustache.call(depth0, "view.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-poplist",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

    function program1(depth0,data) {
      
      
      data.buffer.push("\n    <div class=\"eui-nooptions\">No results found.</div>\n  ");
      }

    function program3(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n    ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "listView", {hash:{
        'contentBinding': ("filteredOptions")
      },hashTypes:{'contentBinding': "STRING"},hashContexts:{'contentBinding': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n  ");
      return buffer;
      }

      data.buffer.push("<div class=\"eui-poplistwrapper\">\n  <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":eui-search-wrapper searchString:eui-active")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'class': ("eui-search"),
        'valueBinding': ("searchString"),
        'size': ("1")
      },hashTypes:{'class': "STRING",'valueBinding': "STRING",'size': "STRING"},hashContexts:{'class': depth0,'valueBinding': depth0,'size': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n  </div>\n\n  ");
      stack1 = helpers['if'].call(depth0, "hasNoOptions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n</div>\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-select",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        ");
      stack1 = helpers._triageMustache.call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </p>\n    </div>\n  </div>\n");
      return buffer;
      }

      data.buffer.push(escapeExpression((helper = helpers['eui-button'] || (depth0 && depth0['eui-button']),options={hash:{
        'label': ("view.label"),
        'disabled': ("disabled"),
        'style': ("style"),
        'size': ("size"),
        'width': ("100%"),
        'classBinding': (":eui-select poplistIsOpen:eui-active"),
        'icon': ("eui-icon")
      },hashTypes:{'label': "ID",'disabled': "ID",'style': "ID",'size': "ID",'width': "STRING",'classBinding': "STRING",'icon': "STRING"},hashContexts:{'label': depth0,'disabled': depth0,'style': depth0,'size': depth0,'width': depth0,'classBinding': depth0,'icon': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "eui-button", options))));
      data.buffer.push("\n\n");
      stack1 = helpers['if'].call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });define("emberui/templates/eui-textarea",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n    <label ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'for': ("inputId")
      },hashTypes:{'for': "ID"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">");
      stack1 = helpers._triageMustache.call(depth0, "placeholder", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</label>\n  ");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        ");
      stack1 = helpers._triageMustache.call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </p>\n    </div>\n  </div>\n");
      return buffer;
      }

      data.buffer.push("<div class=\"eui-wrapper\">\n  ");
      stack1 = helpers['if'].call(depth0, "placeholderVisible", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n  ");
      data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
        'value': ("value"),
        'type': ("type"),
        'name': ("name"),
        'disabled': ("disabled"),
        'maxlength': ("maxlength"),
        'tabindex': ("tabindex")
      },hashTypes:{'value': "ID",'type': "ID",'name': "ID",'disabled': "ID",'maxlength': "ID",'tabindex': "ID"},hashContexts:{'value': depth0,'type': depth0,'name': depth0,'disabled': depth0,'maxlength': depth0,'tabindex': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
      data.buffer.push("\n</div>\n\n");
      stack1 = helpers['if'].call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });define("emberui/utilities/tabbable-selector",
  [],
  function() {
    "use strict";
    /*!
     * Copied from ic-modal which is adapted from jQuery UI core
     *
     * http://jqueryui.com
     * https://github.com/instructure/ic-modal/tree/gh-pages
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */

    var $ = Ember.$;

    function focusable( element, isTabIndexNotNaN ) {
      var nodeName = element.nodeName.toLowerCase();
      return ( /input|select|textarea|button|object/.test( nodeName ) ?
        !element.disabled :
        "a" === nodeName ?
          element.href || isTabIndexNotNaN :
          isTabIndexNotNaN) && visible( element );
    }

    function visible( element ) {
      return $.expr.filters.visible( element ) &&
        !$( element ).parents().addBack().filter(function() {
          return $.css( this, "visibility" ) === "hidden";
        }).length;
    }

    if (!$.expr[':'].tabbable) {
      $.expr[':'].tabbable = function( element ) {
        var tabIndex = $.attr( element, "tabindex" ),
          isTabIndexNaN = isNaN( tabIndex );
        return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
      }
    };
  });