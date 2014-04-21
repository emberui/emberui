"use strict";
var validationSupport = require("../mixins/validation-support")["default"] || require("../mixins/validation-support");
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var sizeSupport = require("../mixins/size-support")["default"] || require("../mixins/size-support");
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

exports["default"] = checkbox;