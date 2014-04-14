"use strict";
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var poplistLayout = require("../templates/eui-poplist")["default"] || require("../templates/eui-poplist");
var itemViewClassTemplate = require("../templates/eui-poplist-option")["default"] || require("../templates/eui-poplist-option");
var poplist;

poplist = Em.Component.extend(styleSupport, {
  layout: poplistLayout,
  classNames: ['eui-poplist'],
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
    var animation, cssRule, domPrefixes, prefix, _i, _len;
    this.setProperties({
      isOpen: false,
      highlightedIndex: -1
    });
    $(window).unbind('scroll.emberui');
    $(window).unbind('click.emberui');
    this.get('previousFocus').focus();
    animation = false;
    domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
    if ((this.$().css('animationName')) !== 'none') {
      animation = true;
    }
    for (_i = 0, _len = domPrefixes.length; _i < _len; _i++) {
      prefix = domPrefixes[_i];
      cssRule = this.$().css(prefix + 'animationName');
      if (cssRule && cssRule !== 'none') {
        animation = true;
      }
    }
    if (animation) {
      return this.$().one('webkitAnimationEnd mozAnimationEnd oanimationend msAnimationEnd animationend', (function(_this) {
        return function() {
          return _this.destroy();
        };
      })(this));
    } else {
      return this.destroy();
    }
  },
  didInsertElement: function() {
    this.set('isOpen', true);
    this.set('previousFocus', $("*:focus"));
    (this, function() {
      return this.focusOnSearch();
    });
    return (this, function() {
      return this.scrollToSelection(this.get('options').indexOf(this.get('selection')), true);
    });
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
      return this.$().bind('mousewheel DOMMouseScroll', (function(_this) {
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
    (this, function() {
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