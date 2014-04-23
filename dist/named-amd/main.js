define("emberui/components/eui-button",
  ["../mixins/style-support","../mixins/size-support","../mixins/disabled-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var sizeSupport = __dependency2__["default"] || __dependency2__;
    var disabledSupport = __dependency3__["default"] || __dependency3__;
    var button;

    button = Em.Component.extend(styleSupport, sizeSupport, disabledSupport, {
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
  });define("emberui/components/eui-checkbox",
  ["../mixins/validation-support","../mixins/style-support","../mixins/size-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var validationSupport = __dependency1__["default"] || __dependency1__;
    var styleSupport = __dependency2__["default"] || __dependency2__;
    var sizeSupport = __dependency3__["default"] || __dependency3__;
    var checkbox;

    checkbox = Em.Component.extend(validationSupport, styleSupport, sizeSupport, {
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
      primaryAction: Em.computed(function() {
        return this.get('options').findBy('primary', true);
      }).property('options'),
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
      }).property("options"),
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
  ["../mixins/validation-support","../mixins/text-support","../mixins/style-support","../mixins/size-support","../mixins/width-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var validationSupport = __dependency1__["default"] || __dependency1__;
    var textSupport = __dependency2__["default"] || __dependency2__;
    var styleSupport = __dependency3__["default"] || __dependency3__;
    var sizeSupport = __dependency4__["default"] || __dependency4__;
    var widthSupport = __dependency5__["default"] || __dependency5__;
    var input;

    input = Em.Component.extend(validationSupport, textSupport, styleSupport, sizeSupport, widthSupport, {
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
      open: Ember.computed(function(key, value) {
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
      }).property('renderModal'),
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
      highlighted: Ember.computed(function(key, value) {
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
      }).property('highlightedIndex', 'filteredOptions'),
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
          isHighlighted: Ember.computed(function() {
            return this.get('controller.highlighted') === this.get('content');
          }).property('controller.highlighted', 'content'),
          isSelected: Ember.computed(function() {
            return this.get('controller.selection') === this.get('content');
          }).property('controller.selection', 'content'),
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
  ["../mixins/style-support","../mixins/size-support","../components/eui-poplist","../mixins/disabled-support","../mixins/width-support","../mixins/validation-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var sizeSupport = __dependency2__["default"] || __dependency2__;
    var poplistComponent = __dependency3__["default"] || __dependency3__;
    var disabledSupport = __dependency4__["default"] || __dependency4__;
    var widthSupport = __dependency5__["default"] || __dependency5__;
    var validationSupport = __dependency6__["default"] || __dependency6__;
    var select;

    select = Em.Component.extend(styleSupport, sizeSupport, disabledSupport, widthSupport, validationSupport, {
      tagName: 'eui-select',
      classNames: ['eui-select'],
      classNameBindings: ['isDisabled:eui-disabled', 'selection::eui-placeholder', 'poplistIsOpen:eui-active', 'class'],
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
      selection: Ember.computed(function(key, value) {
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
      }).property('_selection'),
      value: Ember.computed(function(key, value) {
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
      }).property('selection', 'valuePath'),
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
      onChange: (function() {
        return Ember.run.once(this, 'validateField');
      }).observes('value')
    });

    __exports__["default"] = select;
  });define("emberui/components/eui-textarea",
  ["../mixins/validation-support","../mixins/text-support","../mixins/style-support","../mixins/size-support","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var validationSupport = __dependency1__["default"] || __dependency1__;
    var textSupport = __dependency2__["default"] || __dependency2__;
    var styleSupport = __dependency3__["default"] || __dependency3__;
    var sizeSupport = __dependency4__["default"] || __dependency4__;
    var textarea;

    textarea = Em.Component.extend(validationSupport, textSupport, styleSupport, sizeSupport, {
      classNameBindings: [':eui-textarea'],
      attributeBindings: ['computedWidthAndHeight:style'],
      tagName: 'eui-textarea',
      height: null,
      computedWidthAndHeight: Em.computed(function() {
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
      }).property('size', 'width', 'height')
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


    var initializer = Ember.Application.initializer({
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

    __exports__["default"] = initializer;
  });define("emberui/mixins/animations-did-complete",
  ["exports"],
  function(__exports__) {
    "use strict";
    var animationsDidComplete;

    animationsDidComplete = Em.Mixin.create({
      animationsDidComplete: function() {
        var promise;
        promise = new Ember.RSVP.Promise((function(_this) {
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
      isDisabled: Em.computed(function() {
        if (this.get('disabled') || this.get('loading')) {
          return true;
        }
      }).property('disabled', 'loading')
    });

    __exports__["default"] = disabledsupport;
  });define("emberui/mixins/size-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var sizesupport;

    sizesupport = Em.Mixin.create({
      classNameBindings: ['computedSize'],
      size: 'medium',
      computedSize: Em.computed(function() {
        return 'eui-' + this.get('size');
      }).property('size')
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
      didInsertElement: function() {
        return this.set('inputId', this.$('input').attr('id') || this.$('textarea').attr('id'));
      },
      placeholderVisible: Em.computed(function() {
        var placeholder, value;
        placeholder = this.get('placeholder');
        value = this.get('value');
        if (placeholder && !value) {
          return true;
        }
      }).property('placeholder', 'value')
    });

    __exports__["default"] = textsupport;
  });define("emberui/mixins/validation-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var validationsupport;

    validationsupport = Em.Mixin.create({
      classNameBindings: ['errorState:eui-error'],
      errorState: null,
      errorMessage: null,
      forceValidate: false,
      validateField: function(type) {
        var error, forceValidate, value;
        error = this.get('error');
        value = this.get('value');
        forceValidate = this.get('forceValidate');
        if (type === 'onload' && !value && !forceValidate) {
          return;
        }
        if (Ember.isArray(error)) {
          error = error[0];
        }
        if (error) {
          this.set('errorState', true);
          if (error && typeof error !== 'boolean') {
            return this.set('errorMessage', error);
          }
        } else {
          this.set('errorState', false);
          return this.set('errorMessage', null);
        }
      },
      focusOut: function() {
        return this.validateField();
      },
      onChange: (function() {
        if (this.get('errorState')) {
          return Ember.run.once(this, 'validateField');
        }
      }).observes('value'),
      forceValidation: (function() {
        return this.validateField();
      }).observes('forceValidate'),
      validateOnLoad: (function() {
        return this.validateField('onload');
      }).on('init')
    });

    __exports__["default"] = validationsupport;
  });define("emberui/mixins/width-support",
  ["exports"],
  function(__exports__) {
    "use strict";
    var widthsupport;

    widthsupport = Em.Mixin.create({
      attributeBindings: ['computedWidth:style'],
      computedWidth: Em.computed(function() {
        var width, widths;
        widths = {
          tiny: '100px',
          small: '150px',
          medium: '200px',
          large: '250px'
        };
        width = this.get('width') || widths[this.get('size')] || widths['medium'];
        return "width: " + width + ";";
      }).property('size', 'width')
    });

    __exports__["default"] = widthsupport;
  });define("emberui/templates/eui-button",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<button {{bind-attr disabled=\"isDisabled\" type=\"type\" }}></button>\n\n<div class=\"eui-button-form\">\n  <div class=\"eui-wrapper\">\n    <i>\n      {{#if icon}}\n        <b {{bind-attr class=\'icon\'}}></b>\n      {{/if}}\n\n      {{label}}\n\n      {{#if trailingIcon}}\n        <b {{bind-attr class=\'trailingIcon\'}}></b>\n      {{/if}}\n    </i>\n\n    {{#if loading}}\n      <ul class=\"eui-loading-animation\">\n        <li></li>\n        <li></li>\n        <li></li>\n      </ul>\n    {{/if}}\n  </div>\n</div>\n");
  });define("emberui/templates/eui-calendar",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<div class=\"eui-calendar-wrapper\">\n  <button {{action \"prev\"}} {{bind-attr disabled=\"isPrevDisabled\"}} class=\"eui-previous\"></button>\n  <button {{action \"next\"}} {{bind-attr disabled=\"isNextDisabled\"}} class=\"eui-next\"></button>\n\n  {{#if showPrevMonth}}\n    <div class=\"eui-month-container\">\n      <header>\n        {{prevMonthLabel}}\n      </header>\n      <div class=\"eui-month-frame\">\n        <ol class=\"eui-daysofweek\">\n          <li class=\"eui-nameofday\">Sun</li>\n          <li class=\"eui-nameofday\">Mon</li>\n          <li class=\"eui-nameofday\">Tue</li>\n          <li class=\"eui-nameofday\">Wed</li>\n          <li class=\"eui-nameofday\">Thu</li>\n          <li class=\"eui-nameofday\">Fri</li>\n          <li class=\"eui-nameofday\">Sat</li>\n        </ol>\n        {{eui-month\n          month=prevMonth\n          selection=_selection\n          disabledDates=disabledDates\n          select=\"dateSelected\"}}\n      </div>\n    </div>\n  {{/if}}\n\n  <div class=\"eui-month-container\">\n    <header>\n      {{monthLabel}}\n    </header>\n    <div class=\"eui-month-frame\">\n      <ol class=\"eui-daysofweek\">\n        <li class=\"eui-nameofday\">Sun</li>\n        <li class=\"eui-nameofday\">Mon</li>\n        <li class=\"eui-nameofday\">Tue</li>\n        <li class=\"eui-nameofday\">Wed</li>\n        <li class=\"eui-nameofday\">Thu</li>\n        <li class=\"eui-nameofday\">Fri</li>\n        <li class=\"eui-nameofday\">Sat</li>\n      </ol>\n      {{eui-month\n        month=month\n        selection=_selection\n        disabledDates=disabledDates\n        select=\"dateSelected\"}}\n    </div>\n  </div>\n\n  {{#if showNextMonth}}\n    <div class=\"eui-month-container\">\n      <header>\n        {{nextMonthLabel}}\n      </header>\n      <div class=\"eui-month-frame\">\n        <ol class=\"eui-daysofweek\">\n          <li class=\"eui-nameofday\">Sun</li>\n          <li class=\"eui-nameofday\">Mon</li>\n          <li class=\"eui-nameofday\">Tue</li>\n          <li class=\"eui-nameofday\">Wed</li>\n          <li class=\"eui-nameofday\">Thu</li>\n          <li class=\"eui-nameofday\">Fri</li>\n          <li class=\"eui-nameofday\">Sat</li>\n        </ol>\n        {{eui-month\n          month=nextMonth\n          selection=_selection\n          disabledDates=disabledDates\n          select=\"dateSelected\"}}\n      </div>\n    </div>\n  {{/if}}\n</div>\n");
  });define("emberui/templates/eui-checkbox",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<input type=\"checkbox\" {{bind-attr checked=value disabled=disabled}} />\n\n<div {{bind-attr class=\":eui-checkbox-form disabled:eui-disabled:eui-enabled\"}}>\n  <div class=\"eui-wrapper\">\n    <i class=\"eui-icon\"></i>\n  </div>\n</div>\n\n{{label}}\n\n{{#if errorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{errorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
  });define("emberui/templates/eui-dropbutton",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if primaryAction}}\n  {{eui-button\n    label=primaryAction.label\n    style=view.style\n    size=view.size\n    icon=view.icon\n    loading=view.loading\n    disabled=view.disabled\n    class=\"eui-primaryaction\"\n    action=\"primaryAction\"}}\n\n  {{eui-button\n    style=view.style\n    size=view.size\n    icon=\"fa fa-caret-down\"\n    loading=false\n    disabled=view.disabled\n    classBinding=\":eui-trigger poplistIsOpen:eui-active\"\n    action=\"toggleWindow\"}}\n\n{{else}}\n  {{eui-button\n    label=view.label\n    style=view.style\n    size=view.size\n    icon=view.icon\n    trailingIcon=\"fa fa-caret-down\"\n    loading=view.loading\n    disabled=view.disabled\n    classBinding=\"poplistIsOpen:eui-active\"\n    action=\"toggleWindow\"}}\n\n{{/if}}\n");
  });define("emberui/templates/eui-input",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<div class=\"eui-wrapper\">\n  {{#if placeholderVisible}}\n    <label {{bind-attr for=inputId}}>{{placeholder}}</label>\n  {{/if}}\n  {{input type=type value=value name=name disabled=disabled maxlength=maxlength tabindex=tabindex}}\n</div>\n\n{{#if errorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{errorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
  });define("emberui/templates/eui-modal",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if renderModal}}\n  <div class=\"eui-modal-wrapper\">\n\n    <div class=\"eui-modal-table\">\n      <div class=\"eui-modal-cell\">\n\n        <div class=\"eui-modalobject eui-animation\">\n          <div class=\"eui-modalobject-wrapper\">\n            {{#if programmatic}}\n              {{view contentViewClass contentBinding=\"content\"}}\n            {{else}}\n              {{yield}}\n            {{/if}}\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n    <div class=\"eui-overlay eui-animation\"></div>\n  </div>\n{{/if}}\n");
  });define("emberui/templates/eui-poplist-option",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{view.label}}\n");
  });define("emberui/templates/eui-poplist",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<div class=\"eui-poplistwrapper\">\n  <div {{bind-attr class=\":eui-search-wrapper searchString:eui-active\"}}>\n    {{input class=\"eui-search\" valueBinding=\"searchString\" size=\"1\"}}\n  </div>\n\n  {{#if hasNoOptions}}\n    <div class=\"eui-nooptions\">No results found.</div>\n  {{else}}\n    {{view listView contentBinding=\"filteredOptions\"}}\n  {{/if}}\n</div>\n");
  });define("emberui/templates/eui-select",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<button {{bind-attr disabled=\"isDisabled\" }}></button>\n\n<div class=\"eui-select-form\">\n  <div class=\"eui-wrapper\">\n    <i>{{view.label}}</i>\n    <b class=\"eui-icon\"></b>\n  </div>\n</div>\n\n{{#if errorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{errorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
  });define("emberui/templates/eui-textarea",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<div class=\"eui-wrapper\">\n  {{#if placeholderVisible}}\n    <label {{bind-attr for=inputId}}>{{placeholder}}</label>\n  {{/if}}\n  {{textarea value=value type=type name=name disabled=disabled maxlength=maxlength tabindex=tabindex}}\n</div>\n\n{{#if errorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{errorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
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