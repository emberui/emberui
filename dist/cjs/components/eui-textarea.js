"use strict";
var className = require("../mixins/class-name")["default"] || require("../mixins/class-name");
var errorSupport = require("../mixins/error-support")["default"] || require("../mixins/error-support");
var textSupport = require("../mixins/text-support")["default"] || require("../mixins/text-support");
var textarea;

textarea = Em.Component.extend(errorSupport, textSupport, className, {
  attributeBindings: ['computedWidthAndHeight:style'],
  tagName: 'eui-textarea',
  baseClass: 'input',
  style: 'default',
  size: 'medium',
  height: null,
  computedWidthAndHeight: Em.computed('size', 'width', 'height', function() {
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
  })
});

exports["default"] = textarea;