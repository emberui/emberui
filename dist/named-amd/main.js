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
      label: null,
      icon: null,
      trailingIcon: null,
      loading: null,
      disabled: null,
      action: null,
      "class": null,
      click: function(event) {
        event.preventDefault();
        return this.sendAction('action', this.get('context'));
      }
    });

    __exports__["default"] = button;
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
      tagName: 'div',
      classNameBindings: ['primaryAction:eui-groupbutton:eui-singlebutton'],
      poplistIsOpen: false,
      primaryAction: Em.computed(function() {
        return this.get('options').findBy('primary', true);
      }).property('options'),
      secondaryAction: (function() {
        var action;
        action = this.get('selection.action');
        if (action) {
          this.triggerAction({
            action: action
          });
        }
        return this.set('selection', null);
      }).observes('selection'),
      actions: {
        toggleWindow: function() {
          if (!this.get('poplistIsOpen')) {
            return poplistComponent.show({
              targetObject: this,
              isOpenBinding: 'targetObject.poplistIsOpen',
              selectionBinding: 'targetObject.selection',
              options: this.get('options'),
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
      maxlength: null
    });

    __exports__["default"] = input;
  });define("emberui/components/eui-modal",
  ["../mixins/style-support","../templates/eui-modal","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var modalLayout = __dependency2__["default"] || __dependency2__;
    var modal;

    modal = Em.Component.extend(styleSupport, {
      layout: modalLayout,
      classNames: ['eui-modal'],
      classNameBindings: ['class', 'isOpen::eui-closing'],
      content: null,
      "class": null,
      isOpen: null,
      actions: {
        closeModal: function() {
          return this.hide();
        }
      },
      hide: function() {
        var animation, domPrefixes, prefix, _i, _len;
        this.set('isOpen', false);
        animation = false;
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
        if (this.$().css('animationName')) {
          animation = true;
        }
        for (_i = 0, _len = domPrefixes.length; _i < _len; _i++) {
          prefix = domPrefixes[_i];
          if (this.$().css(prefix + 'animationName')) {
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
        return this.set('isOpen', true);
      }
    });

    modal.reopenClass({
      show: function(options) {
        if (options == null) {
          options = {};
        }
        modal = this.create(options);
        modal.container = modal.get('targetObject.container');
        modal.appendTo('body');
        return modal;
      }
    });

    __exports__["default"] = modal;
  });define("emberui/components/eui-poplist",
  ["../mixins/style-support","../templates/eui-poplist","../templates/eui-poplist-option","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var poplistLayout = __dependency2__["default"] || __dependency2__;
    var itemViewClassTemplate = __dependency3__["default"] || __dependency3__;
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
      highlightedOption: (function() {
        var index, options;
        options = this.get('filteredOptions');
        index = this.get('highlightedIndex');
        return options[index];
      }).property('highlightedIndex', 'filteredOptions'),
      hide: function() {
        var animation, domPrefixes, prefix, _i, _len;
        this.set('isOpen', false).set('highlightedIndex', -1);
        $(window).unbind('scroll.emberui');
        $(window).unbind('click.emberui');
        this.get('previousFocus').focus();
        animation = false;
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
        if (this.$().css('animationName')) {
          animation = true;
        }
        for (_i = 0, _len = domPrefixes.length; _i < _len; _i++) {
          prefix = domPrefixes[_i];
          if (this.$().css(prefix + 'animationName')) {
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
        Ember.run.next(this, function() {
          return this.focusOnSearch();
        });
        return Ember.run.next(this, function() {
          return this.scrollToSelection(this.get('selection'));
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
      scrollToSelection: function(option) {
        var $listView, endIndex, index, listView, numRows, startIndex;
        $listView = this.$('.ember-list-view');
        listView = Ember.View.views[$listView.attr('id')];
        startIndex = listView._startingIndex();
        numRows = listView._childViewCount() - 1;
        endIndex = startIndex + numRows;
        index = this.get('options').indexOf(option);
        if (index < startIndex) {
          return $listView.scrollTop(index * this.get('listRowHeight'));
        } else if (index >= endIndex) {
          return $listView.scrollTop((index - (numRows / 2)) * this.get('listRowHeight'));
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
        this.set('selection', this.get('highlightedOption'));
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
          labelPath: Ember.computed.alias('controller.labelPath'),
          highlightedIndex: Ember.computed.alias('controller.highlightedIndex'),
          highlightedOption: Ember.computed.alias('controller.highlightedOption'),
          selection: Ember.computed.alias('controller.selection'),
          filteredOptions: Ember.computed.alias('controller.filteredOptions'),
          event: Ember.computed.alias('controller.event'),
          labelPathDidChange: (function() {
            var labelPath;
            labelPath = this.get('labelPath');
            Ember.defineProperty(this, 'label', Ember.computed.alias("context." + labelPath));
            return this.notifyPropertyChange('label');
          }).observes('content', 'labelPath'),
          initializeLabelPath: (function() {
            return this.labelPathDidChange();
          }).on('init'),
          updateContext: function(context) {
            this._super(context);
            return this.set('content', context);
          },
          isHighlighted: Ember.computed(function() {
            return this.get('highlightedOption') === this.get('context');
          }).property('highlightedOption', 'content'),
          isSelected: Ember.computed(function() {
            return this.get('selection') === this.get('context');
          }).property('selection', 'content'),
          click: function() {
            this.set('selection', this.get('context'));
            return this.get('controller').hide();
          },
          mouseEnter: function() {
            var hoveredOption, options;
            options = this.get('filteredOptions');
            hoveredOption = this.get('context');
            return this.set('highlightedIndex', options.indexOf(hoveredOption));
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
      }).property('options.@each required'),
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
          selection = value;
          if (valuePath) {
            selection = this.get('options').findProperty(valuePath, value);
          }
          this.set('selection', selection);
          return value;
        } else {
          valuePath = this.get('valuePath');
          if (valuePath) {
            return this.get("selection." + valuePath);
          } else {
            return null;
          }
        }
      }).property('selection'),
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
            options: this.get('optionsWithBlank'),
            labelPathBinding: 'targetObject.labelPath',
            style: 'flyin'
          });
        }
      },
      keyDown: function(event) {
        if (event.which === 40) {
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
  ["./components/eui-button","./templates/eui-button","./components/eui-checkbox","./templates/eui-checkbox","./components/eui-dropbutton","./templates/eui-dropbutton","./components/eui-input","./templates/eui-input","./components/eui-modal","./templates/eui-modal","./components/eui-poplist","./templates/eui-poplist","./templates/eui-poplist-option","./components/eui-select","./templates/eui-select","./components/eui-textarea","./templates/eui-textarea","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __exports__) {
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
      }
    });

    __exports__.EuiButtonComponent = EuiButtonComponent;
    __exports__.EuiCheckboxComponent = EuiCheckboxComponent;
    __exports__.EuiDropbuttonComponent = EuiDropbuttonComponent;
    __exports__.EuiInputComponent = EuiInputComponent;
    __exports__.EuiModalComponent = EuiModalComponent;
    __exports__.EuiPoplistComponent = EuiPoplistComponent;
    __exports__.EuiSelectComponent = EuiSelectComponent;
    __exports__.EuiTextareaComponent = EuiTextareaComponent;
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
    __exports__["default"] = Ember.Handlebars.compile("<button {{bind-attr disabled=\"isDisabled\" }}></button>\n\n<div class=\"eui-button-form\">\n  <div class=\"eui-wrapper\">\n    <i>\n      {{#if icon}}\n        <b {{bind-attr class=\'icon\'}}></b>\n      {{/if}}\n\n      {{label}}\n\n      {{#if trailingIcon}}\n        <b {{bind-attr class=\'trailingIcon\'}}></b>\n      {{/if}}\n    </i>\n\n    {{#if loading}}\n      <ul class=\"eui-loading-animation\">\n        <li></li>\n        <li></li>\n        <li></li>\n      </ul>\n    {{/if}}\n  </div>\n</div>\n");
  });define("emberui/templates/eui-checkbox",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<input type=\"checkbox\" {{bind-attr value=value disabled=disabled}} />\n\n<div {{bind-attr class=\":eui-checkbox-form disabled:eui-disabled:eui-enabled\"}}>\n  <div class=\"eui-wrapper\">\n    <i class=\"eui-icon\"></i>\n  </div>\n</div>\n\n{{label}}\n\n{{#if computedErrorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{computedErrorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
  });define("emberui/templates/eui-dropbutton",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if primaryAction}}\n  {{eui-button\n    label=primaryAction.label\n    style=view.style\n    size=view.size\n    icon=view.icon\n    loading=view.loading\n    disabled=view.disabled\n    class=\"eui-primaryaction\"\n    action=\"primaryAction\"}}\n\n  {{eui-button\n    style=view.style\n    size=view.size\n    icon=\"fa fa-caret-down\"\n    loading=false\n    disabled=view.disabled\n    classBinding=\":eui-trigger poplistIsOpen:eui-active\"\n    action=\"toggleWindow\"}}\n\n{{else}}\n  {{eui-button\n    label=view.label\n    style=view.style\n    size=view.size\n    icon=view.icon\n    trailingIcon=\"fa fa-caret-down\"\n    loading=view.loading\n    disabled=view.disabled\n    classBinding=\"poplistIsOpen:eui-active\"\n    action=\"toggleWindow\"}}\n\n{{/if}}\n");
  });define("emberui/templates/eui-input",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<div class=\"eui-wrapper\">\n  {{#if placeholderVisible}}\n    <label {{bind-attr for=inputId}}>{{placeholder}}</label>\n  {{/if}}\n  {{input type=type value=value name=name disabled=disabled maxlength=maxlength tabindex=tabindex}}\n</div>\n\n{{#if computedErrorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{computedErrorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
  });define("emberui/templates/eui-modal",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<div class=\"eui-verticalspacer\">\n  <div class=\"eui-modalobject\">\n    <div class=\"eui-modalwrapper\">\n      {{view contentViewClass contentBinding=\"content\"}}\n    </div>\n  </div>\n</div>\n\n<div class=\"eui-overlay\"></div>\n");
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
    __exports__["default"] = Ember.Handlebars.compile("<button {{bind-attr disabled=\"isDisabled\" }}></button>\n\n<div class=\"eui-select-form\">\n  <div class=\"eui-wrapper\">\n    <i>{{view.label}}</i>\n    <b class=\"eui-icon\"></b>\n  </div>\n</div>\n\n{{#if computedErrorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{computedErrorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
  });define("emberui/templates/eui-textarea",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<div class=\"eui-wrapper\">\n  {{#if placeholderVisible}}\n    <label {{bind-attr for=inputId}}>{{placeholder}}</label>\n  {{/if}}\n  {{textarea value=value type=type name=name disabled=disabled maxlength=maxlength tabindex=tabindex}}\n</div>\n\n{{#if computedErrorMessage}}\n  <div class=\"eui-error-message\">\n    <div class=\"eui-error-wrapper\">\n      <p>\n        {{computedErrorMessage}}\n      </p>\n    </div>\n  </div>\n{{/if}}\n");
  });