"use strict";
var validationSupport = require("../mixins/validation-support")["default"] || require("../mixins/validation-support");
var textSupport = require("../mixins/text-support")["default"] || require("../mixins/text-support");
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var sizeSupport = require("../mixins/size-support")["default"] || require("../mixins/size-support");
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

exports["default"] = textarea;