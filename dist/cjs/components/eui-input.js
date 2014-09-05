"use strict";
var errorSupport = require("../mixins/error-support")["default"] || require("../mixins/error-support");
var textSupport = require("../mixins/text-support")["default"] || require("../mixins/text-support");
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var sizeSupport = require("../mixins/size-support")["default"] || require("../mixins/size-support");
var widthSupport = require("../mixins/width-support")["default"] || require("../mixins/width-support");
var input;

input = Em.Component.extend(errorSupport, textSupport, styleSupport, sizeSupport, widthSupport, {
  classNameBindings: [':eui-input'],
  tagName: 'eui-input',
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