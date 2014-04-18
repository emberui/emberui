!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.Ember||(f.Ember={})).EmberUi=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var styleSupport = _dereq_("../mixins/style-support")["default"] || _dereq_("../mixins/style-support");
var sizeSupport = _dereq_("../mixins/size-support")["default"] || _dereq_("../mixins/size-support");
var disabledSupport = _dereq_("../mixins/disabled-support")["default"] || _dereq_("../mixins/disabled-support");
var button;

button = Em.Component.extend(styleSupport, sizeSupport, disabledSupport, {
  classNameBindings: [':eui-button', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class'],
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

exports["default"] = button;
},{"../mixins/disabled-support":11,"../mixins/size-support":12,"../mixins/style-support":13}],2:[function(_dereq_,module,exports){
"use strict";
var validationSupport = _dereq_("../mixins/validation-support")["default"] || _dereq_("../mixins/validation-support");
var styleSupport = _dereq_("../mixins/style-support")["default"] || _dereq_("../mixins/style-support");
var sizeSupport = _dereq_("../mixins/size-support")["default"] || _dereq_("../mixins/size-support");
var checkbox;

checkbox = Em.Component.extend(validationSupport, styleSupport, sizeSupport, {
  classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class'],
  value: false,
  disabled: false,
  click: function() {
    if (!this.get('disabled')) {
      return this.toggleProperty('value');
    }
  }
});

exports["default"] = checkbox;
},{"../mixins/size-support":12,"../mixins/style-support":13,"../mixins/validation-support":15}],3:[function(_dereq_,module,exports){
"use strict";
var styleSupport = _dereq_("../mixins/style-support")["default"] || _dereq_("../mixins/style-support");
var sizeSupport = _dereq_("../mixins/size-support")["default"] || _dereq_("../mixins/size-support");
var poplistComponent = _dereq_("../components/eui-poplist")["default"] || _dereq_("../components/eui-poplist");
var dropbutton;

dropbutton = Em.Component.extend(styleSupport, sizeSupport, {
  tagName: 'div',
  classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton'],
  poplistIsOpen: false,
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
          style: 'bubble'
        });
      }
    },
    primaryAction: function() {
      return this.sendAction('primaryAction.action', this);
    }
  }
});

exports["default"] = dropbutton;
},{"../components/eui-poplist":6,"../mixins/size-support":12,"../mixins/style-support":13}],4:[function(_dereq_,module,exports){
"use strict";
var validationSupport = _dereq_("../mixins/validation-support")["default"] || _dereq_("../mixins/validation-support");
var textSupport = _dereq_("../mixins/text-support")["default"] || _dereq_("../mixins/text-support");
var styleSupport = _dereq_("../mixins/style-support")["default"] || _dereq_("../mixins/style-support");
var sizeSupport = _dereq_("../mixins/size-support")["default"] || _dereq_("../mixins/size-support");
var widthSupport = _dereq_("../mixins/width-support")["default"] || _dereq_("../mixins/width-support");
var input;

input = Em.Component.extend(validationSupport, textSupport, styleSupport, sizeSupport, widthSupport, {
  classNameBindings: [':eui-input'],
  maxlength: null
});

exports["default"] = input;
},{"../mixins/size-support":12,"../mixins/style-support":13,"../mixins/text-support":14,"../mixins/validation-support":15,"../mixins/width-support":16}],5:[function(_dereq_,module,exports){
"use strict";
var styleSupport = _dereq_("../mixins/style-support")["default"] || _dereq_("../mixins/style-support");
var animationsDidComplete = _dereq_("../mixins/animations-did-complete")["default"] || _dereq_("../mixins/animations-did-complete");
var modalLayout = _dereq_("../templates/eui-modal")["default"] || _dereq_("../templates/eui-modal");
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

exports["default"] = modal;
},{"../mixins/animations-did-complete":10,"../mixins/style-support":13,"../templates/eui-modal":21}],6:[function(_dereq_,module,exports){
"use strict";
var styleSupport = _dereq_("../mixins/style-support")["default"] || _dereq_("../mixins/style-support");
var animationsDidComplete = _dereq_("../mixins/animations-did-complete")["default"] || _dereq_("../mixins/animations-did-complete");
var poplistLayout = _dereq_("../templates/eui-poplist")["default"] || _dereq_("../templates/eui-poplist");
var itemViewClassTemplate = _dereq_("../templates/eui-poplist-option")["default"] || _dereq_("../templates/eui-poplist-option");
var poplist;

poplist = Em.Component.extend(styleSupport, animationsDidComplete, {
  layout: poplistLayout,
  classNames: ['eui-poplist eui-animation'],
  classNameBindings: ['isOpen::eui-closing'],
  attributeBindings: ['tabindex'],
  labelPath: 'label',
  options: null,
  listHeight: '80',
  listRowHeight: '20',
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
    Ember.run.next(this, function() {
      return this.scrollToSelection(this.get('options').indexOf(this.get('selection')), true);
    });
    return $('body').addClass('eui-poplist-open');
  },
  focusOnSearch: function() {
    return this.$().find('input:first').focus();
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

exports["default"] = poplist;
},{"../mixins/animations-did-complete":10,"../mixins/style-support":13,"../templates/eui-poplist":23,"../templates/eui-poplist-option":22}],7:[function(_dereq_,module,exports){
"use strict";
var styleSupport = _dereq_("../mixins/style-support")["default"] || _dereq_("../mixins/style-support");
var sizeSupport = _dereq_("../mixins/size-support")["default"] || _dereq_("../mixins/size-support");
var poplistComponent = _dereq_("../components/eui-poplist")["default"] || _dereq_("../components/eui-poplist");
var disabledSupport = _dereq_("../mixins/disabled-support")["default"] || _dereq_("../mixins/disabled-support");
var widthSupport = _dereq_("../mixins/width-support")["default"] || _dereq_("../mixins/width-support");
var validationSupport = _dereq_("../mixins/validation-support")["default"] || _dereq_("../mixins/validation-support");
var select;

select = Em.Component.extend(styleSupport, sizeSupport, disabledSupport, widthSupport, validationSupport, {
  tagName: 'div',
  classNames: ['eui-select'],
  classNameBindings: ['isDisabled:eui-disabled', 'selection::eui-placeholder', 'poplistIsOpen:eui-active', 'class'],
  poplistIsOpen: false,
  required: false,
  options: [],
  labelPath: 'label',
  valuePath: 'value',
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
      this.set('internalSelection', value);
      return value;
    } else {
      selection = this.get('internalSelection');
      nullValue = this.get('nullValue');
      if (selection === nullValue) {
        return null;
      } else {
        return selection;
      }
    }
  }).property('internalSelection'),
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
    return this.set('internalSelection', value || this.get('nullValue'));
  }).on('init'),
  click: function() {
    if (!this.get('poplistIsOpen')) {
      return poplistComponent.show({
        targetObject: this,
        isOpenBinding: 'targetObject.poplistIsOpen',
        selectionBinding: 'targetObject.internalSelection',
        optionsBinding: 'targetObject.optionsWithBlank',
        labelPathBinding: 'targetObject.labelPath',
        style: 'flyin'
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

exports["default"] = select;
},{"../components/eui-poplist":6,"../mixins/disabled-support":11,"../mixins/size-support":12,"../mixins/style-support":13,"../mixins/validation-support":15,"../mixins/width-support":16}],8:[function(_dereq_,module,exports){
"use strict";
var validationSupport = _dereq_("../mixins/validation-support")["default"] || _dereq_("../mixins/validation-support");
var textSupport = _dereq_("../mixins/text-support")["default"] || _dereq_("../mixins/text-support");
var styleSupport = _dereq_("../mixins/style-support")["default"] || _dereq_("../mixins/style-support");
var sizeSupport = _dereq_("../mixins/size-support")["default"] || _dereq_("../mixins/size-support");
var textarea;

textarea = Em.Component.extend(validationSupport, textSupport, styleSupport, sizeSupport, {
  classNameBindings: [':eui-textarea'],
  attributeBindings: ['computedWidthAndHeight:style'],
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

exports["default"] = textarea;
},{"../mixins/size-support":12,"../mixins/style-support":13,"../mixins/text-support":14,"../mixins/validation-support":15}],9:[function(_dereq_,module,exports){
"use strict";
/*!
EmberUI (c) 2014 Jaco Joubert
License: https://github.com/emberui/emberui/blob/master/LICENSE
*/

var EuiButtonComponent = _dereq_("./components/eui-button")["default"] || _dereq_("./components/eui-button");
var EuiButtonTemplate = _dereq_("./templates/eui-button")["default"] || _dereq_("./templates/eui-button");

var EuiCheckboxComponent = _dereq_("./components/eui-checkbox")["default"] || _dereq_("./components/eui-checkbox");
var EuiCheckboxTemplate = _dereq_("./templates/eui-checkbox")["default"] || _dereq_("./templates/eui-checkbox");

var EuiDropbuttonComponent = _dereq_("./components/eui-dropbutton")["default"] || _dereq_("./components/eui-dropbutton");
var EuiDropbuttonTemplate = _dereq_("./templates/eui-dropbutton")["default"] || _dereq_("./templates/eui-dropbutton");

var EuiInputComponent = _dereq_("./components/eui-input")["default"] || _dereq_("./components/eui-input");
var EuiInputTemplate = _dereq_("./templates/eui-input")["default"] || _dereq_("./templates/eui-input");

var EuiModalComponent = _dereq_("./components/eui-modal")["default"] || _dereq_("./components/eui-modal");
var EuiModalTemplate = _dereq_("./templates/eui-modal")["default"] || _dereq_("./templates/eui-modal");

var EuiPoplistComponent = _dereq_("./components/eui-poplist")["default"] || _dereq_("./components/eui-poplist");
var EuiPoplistTemplate = _dereq_("./templates/eui-poplist")["default"] || _dereq_("./templates/eui-poplist");
var EuiPoplistOptionTemplate = _dereq_("./templates/eui-poplist-option")["default"] || _dereq_("./templates/eui-poplist-option");

var EuiSelectComponent = _dereq_("./components/eui-select")["default"] || _dereq_("./components/eui-select");
var EuiSelectTemplate = _dereq_("./templates/eui-select")["default"] || _dereq_("./templates/eui-select");

var EuiTextareaComponent = _dereq_("./components/eui-textarea")["default"] || _dereq_("./components/eui-textarea");
var EuiTextareaTemplate = _dereq_("./templates/eui-textarea")["default"] || _dereq_("./templates/eui-textarea");

_dereq_("./utilities/tabbable-selector");
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
  }
});

exports["default"] = initializer;
},{"./components/eui-button":1,"./components/eui-checkbox":2,"./components/eui-dropbutton":3,"./components/eui-input":4,"./components/eui-modal":5,"./components/eui-poplist":6,"./components/eui-select":7,"./components/eui-textarea":8,"./templates/eui-button":17,"./templates/eui-checkbox":18,"./templates/eui-dropbutton":19,"./templates/eui-input":20,"./templates/eui-modal":21,"./templates/eui-poplist":23,"./templates/eui-poplist-option":22,"./templates/eui-select":24,"./templates/eui-textarea":25,"./utilities/tabbable-selector":26}],10:[function(_dereq_,module,exports){
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

exports["default"] = animationsDidComplete;
},{}],11:[function(_dereq_,module,exports){
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

exports["default"] = disabledsupport;
},{}],12:[function(_dereq_,module,exports){
"use strict";
var sizesupport;

sizesupport = Em.Mixin.create({
  classNameBindings: ['computedSize'],
  size: 'medium',
  computedSize: Em.computed(function() {
    return 'eui-' + this.get('size');
  }).property('size')
});

exports["default"] = sizesupport;
},{}],13:[function(_dereq_,module,exports){
"use strict";
var stylesupport;

stylesupport = Em.Mixin.create({
  classNameBindings: ['computedStyle'],
  style: 'default',
  computedStyle: Em.computed(function() {
    return 'eui-' + this.get('style');
  }).property('style')
});

exports["default"] = stylesupport;
},{}],14:[function(_dereq_,module,exports){
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

exports["default"] = textsupport;
},{}],15:[function(_dereq_,module,exports){
"use strict";
var validationsupport;

validationsupport = Em.Mixin.create({
  classNameBindings: ['computedErrorState:eui-error'],
  computedErrorState: null,
  computedErrorMessage: null,
  validateField: function(type) {
    var error, required, value;
    error = this.get('error');
    required = this.get('required');
    value = this.get('value');
    if (type === 'onload' && !value) {
      return;
    }
    if (Ember.isArray(error)) {
      error = error[0];
    }
    if (error || (required && !value)) {
      this.set('computedErrorState', true);
      if (error && typeof error !== 'boolean') {
        return this.set('computedErrorMessage', error);
      }
    } else {
      this.set('computedErrorState', false);
      return this.set('computedErrorMessage', null);
    }
  },
  focusOut: function() {
    return this.validateField();
  },
  onChange: (function() {
    if (this.get('computedErrorState')) {
      return Ember.run.once(this, 'validateField');
    }
  }).observes('value'),
  validateOnLoad: (function() {
    return this.validateField('onload');
  }).on('init')
});

exports["default"] = validationsupport;
},{}],16:[function(_dereq_,module,exports){
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

exports["default"] = widthsupport;
},{}],17:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("<button {{bind-attr disabled=\"isDisabled\" type=\"type\" }}></button>\n\n<div class=\"eui-button-form\">\n  <div class=\"eui-wrapper\">\n    <i>\n      {{#if icon}}\n        <b {{bind-attr class=\'icon\'}}></b>\n      {{/if}}\n\n      {{label}}\n\n      {{#if trailingIcon}}\n        <b {{bind-attr class=\'trailingIcon\'}}></b>\n      {{/if}}\n    </i>\n\n    {{#if loading}}\n      <ul class=\"eui-loading-animation\">\n        <li></li>\n        <li></li>\n        <li></li>\n      </ul>\n    {{/if}}\n  </div>\n</div>\n");
},{}],18:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("<input type=\"checkbox\" {{bind-attr checked=value disabled=disabled}} />\n\n<div {{bind-attr class=\":eui-checkbox-form disabled:eui-disabled:eui-enabled\"}}>\n  <div class=\"eui-wrapper\">\n    <i class=\"eui-icon\"></i>\n  </div>\n</div>\n\n{{label}}\n\n{{#if computedErrorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{computedErrorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
},{}],19:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{#if primaryAction}}\n  {{eui-button\n    label=primaryAction.label\n    style=view.style\n    size=view.size\n    icon=view.icon\n    loading=view.loading\n    disabled=view.disabled\n    class=\"eui-primaryaction\"\n    action=\"primaryAction\"}}\n\n  {{eui-button\n    style=view.style\n    size=view.size\n    icon=\"fa fa-caret-down\"\n    loading=false\n    disabled=view.disabled\n    classBinding=\":eui-trigger poplistIsOpen:eui-active\"\n    action=\"toggleWindow\"}}\n\n{{else}}\n  {{eui-button\n    label=view.label\n    style=view.style\n    size=view.size\n    icon=view.icon\n    trailingIcon=\"fa fa-caret-down\"\n    loading=view.loading\n    disabled=view.disabled\n    classBinding=\"poplistIsOpen:eui-active\"\n    action=\"toggleWindow\"}}\n\n{{/if}}\n");
},{}],20:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("<div class=\"eui-wrapper\">\n  {{#if placeholderVisible}}\n    <label {{bind-attr for=inputId}}>{{placeholder}}</label>\n  {{/if}}\n  {{input type=type value=value name=name disabled=disabled maxlength=maxlength tabindex=tabindex}}\n</div>\n\n{{#if computedErrorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{computedErrorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
},{}],21:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{#if renderModal}}\n  <div class=\"eui-modal-wrapper\">\n\n    <div class=\"eui-modal-table\">\n      <div class=\"eui-modal-cell\">\n\n        <div class=\"eui-modalobject eui-animation\">\n          <div class=\"eui-modalobject-wrapper\">\n            {{#if programmatic}}\n              {{view contentViewClass contentBinding=\"content\"}}\n            {{else}}\n              {{yield}}\n            {{/if}}\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n    <div class=\"eui-overlay eui-animation\"></div>\n  </div>\n{{/if}}\n");
},{}],22:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{view.label}}\n");
},{}],23:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("<div class=\"eui-poplistwrapper\">\n  <div {{bind-attr class=\":eui-search-wrapper searchString:eui-active\"}}>\n    {{input class=\"eui-search\" valueBinding=\"searchString\" size=\"1\"}}\n  </div>\n\n  {{#if hasNoOptions}}\n    <div class=\"eui-nooptions\">No results found.</div>\n  {{else}}\n    {{view listView contentBinding=\"filteredOptions\"}}\n  {{/if}}\n</div>\n");
},{}],24:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("<button {{bind-attr disabled=\"isDisabled\" }}></button>\n\n<div class=\"eui-select-form\">\n  <div class=\"eui-wrapper\">\n    <i>{{view.label}}</i>\n    <b class=\"eui-icon\"></b>\n  </div>\n</div>\n\n{{#if computedErrorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{computedErrorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
},{}],25:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("<div class=\"eui-wrapper\">\n  {{#if placeholderVisible}}\n    <label {{bind-attr for=inputId}}>{{placeholder}}</label>\n  {{/if}}\n  {{textarea value=value type=type name=name disabled=disabled maxlength=maxlength tabindex=tabindex}}\n</div>\n\n{{#if computedErrorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{computedErrorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
},{}],26:[function(_dereq_,module,exports){
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
},{}]},{},[9])
(9)
});