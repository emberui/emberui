"use strict";
var validationSupport = require("../mixins/validation-support")["default"] || require("../mixins/validation-support");
var textSupport = require("../mixins/text-support")["default"] || require("../mixins/text-support");
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var sizeSupport = require("../mixins/size-support")["default"] || require("../mixins/size-support");
var widthSupport = require("../mixins/width-support")["default"] || require("../mixins/width-support");
var input;

input = Em.Component.extend(validationSupport, textSupport, styleSupport, sizeSupport, widthSupport, {
  classNameBindings: [':eui-input'],
  maxlength: null
});

exports["default"] = input;