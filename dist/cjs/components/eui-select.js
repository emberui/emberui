"use strict";
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var sizeSupport = require("../mixins/size-support")["default"] || require("../mixins/size-support");
var poplistComponent = require("../components/eui-poplist")["default"] || require("../components/eui-poplist");
var disabledSupport = require("../mixins/disabled-support")["default"] || require("../mixins/disabled-support");
var widthSupport = require("../mixins/width-support")["default"] || require("../mixins/width-support");
var validationSupport = require("../mixins/validation-support")["default"] || require("../mixins/validation-support");
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