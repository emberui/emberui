"use strict";
var errorSupport = require("../mixins/error-support")["default"] || require("../mixins/error-support");
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var sizeSupport = require("../mixins/size-support")["default"] || require("../mixins/size-support");
var checkbox;

checkbox = Em.Component.extend(errorSupport, styleSupport, sizeSupport, {
  classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class'],
  attributeBindings: ['role', 'value:aria-checked', 'disabled:aria-disabled'],
  role: 'checkbox',
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