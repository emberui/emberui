"use strict";
var errorSupport = require("../mixins/error-support")["default"] || require("../mixins/error-support");
var className = require("../mixins/class-name")["default"] || require("../mixins/class-name");
var checkbox;

checkbox = Em.Component.extend(errorSupport, className, {
  classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class'],
  attributeBindings: ['role', 'value:aria-checked', 'disabled:aria-disabled'],
  baseClass: 'checkbox',
  style: 'default',
  size: 'medium',
  tagName: 'eui-checkbox',
  role: 'checkbox',
  value: false,
  disabled: false,
  click: function() {
    if (!this.get('disabled')) {
      return this.toggleProperty('value');
    }
  }
});

exports["default"] = checkbox;