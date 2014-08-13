"use strict";
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var sizeSupport = require("../mixins/size-support")["default"] || require("../mixins/size-support");
var disabledSupport = require("../mixins/disabled-support")["default"] || require("../mixins/disabled-support");
var widthSupport = require("../mixins/width-support")["default"] || require("../mixins/width-support");
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
  ariaOwns: null,
  ariaHaspopup: null,
  click: function(event) {
    event.preventDefault();
    return this.sendAction('action', this.get('context'));
  }
});

exports["default"] = button;