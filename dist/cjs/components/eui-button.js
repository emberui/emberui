"use strict";
var className = require("../mixins/class-name")["default"] || require("../mixins/class-name");
var disabledSupport = require("../mixins/disabled-support")["default"] || require("../mixins/disabled-support");
var widthSupport = require("../mixins/width-support")["default"] || require("../mixins/width-support");
var button;

button = Em.Component.extend(className, disabledSupport, widthSupport, {
  classNameBindings: ['loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class'],
  baseClass: 'button',
  tagName: 'eui-button',
  style: 'default',
  size: 'medium',
  label: null,
  leadingIcon: null,
  trailingIcon: null,
  loading: null,
  disabled: null,
  action: null,
  "class": null,
  type: 'button',
  width: 'auto',
  ariaOwns: null,
  ariaHaspopup: null,
  click: function(event) {
    event.preventDefault();
    return this.sendAction('action', this.get('context'));
  }
});

exports["default"] = button;