"use strict";
var className = require("../mixins/class-name")["default"] || require("../mixins/class-name");
var errorSupport = require("../mixins/error-support")["default"] || require("../mixins/error-support");
var textSupport = require("../mixins/text-support")["default"] || require("../mixins/text-support");
var widthSupport = require("../mixins/width-support")["default"] || require("../mixins/width-support");
var input;

input = Em.Component.extend(errorSupport, textSupport, className, widthSupport, {
  tagName: 'eui-input',
  baseClass: 'input',
  style: 'default',
  size: 'medium',
  maxlength: null,
  type: 'text',
  action: null,
  actions: {
    enter: function(context) {
      if (this.get('action')) {
        return this.sendAction('action', context);
      }
    }
  }
});

exports["default"] = input;