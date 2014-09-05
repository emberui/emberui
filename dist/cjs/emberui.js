"use strict";
/*!
EmberUI (c) 2014 Jaco Joubert
License: https://github.com/emberui/emberui/blob/master/LICENSE
*/

var EuiButtonComponent = require("./components/eui-button")["default"] || require("./components/eui-button");
var EuiButtonTemplate = require("./templates/eui-button")["default"] || require("./templates/eui-button");

var EuiCheckboxComponent = require("./components/eui-checkbox")["default"] || require("./components/eui-checkbox");
var EuiCheckboxTemplate = require("./templates/eui-checkbox")["default"] || require("./templates/eui-checkbox");

var EuiDropbuttonComponent = require("./components/eui-dropbutton")["default"] || require("./components/eui-dropbutton");
var EuiDropbuttonTemplate = require("./templates/eui-dropbutton")["default"] || require("./templates/eui-dropbutton");

var EuiInputComponent = require("./components/eui-input")["default"] || require("./components/eui-input");
var EuiInputTemplate = require("./templates/eui-input")["default"] || require("./templates/eui-input");

var EuiModalComponent = require("./components/eui-modal")["default"] || require("./components/eui-modal");
var EuiModalTemplate = require("./templates/eui-modal")["default"] || require("./templates/eui-modal");

var EuiPoplistComponent = require("./components/eui-poplist")["default"] || require("./components/eui-poplist");
var EuiPoplistTemplate = require("./templates/eui-poplist")["default"] || require("./templates/eui-poplist");
var EuiPoplistOptionTemplate = require("./templates/eui-poplist-option")["default"] || require("./templates/eui-poplist-option");

var EuiSelectComponent = require("./components/eui-select")["default"] || require("./components/eui-select");
var EuiSelectTemplate = require("./templates/eui-select")["default"] || require("./templates/eui-select");

var EuiSelectDateComponent = require("./components/eui-selectdate")["default"] || require("./components/eui-selectdate");
var EuiSelectDateTemplate = require("./templates/eui-selectdate")["default"] || require("./templates/eui-selectdate");

var EuiTextareaComponent = require("./components/eui-textarea")["default"] || require("./components/eui-textarea");
var EuiTextareaTemplate = require("./templates/eui-textarea")["default"] || require("./templates/eui-textarea");

var EuiMonthComponent = require("./components/eui-month")["default"] || require("./components/eui-month");

var EuiCalendarComponent = require("./components/eui-calendar")["default"] || require("./components/eui-calendar");
var EuiCalendarTemplate = require("./templates/eui-calendar")["default"] || require("./templates/eui-calendar");

var EuiPopcalComponent = require("./components/eui-popcal")["default"] || require("./components/eui-popcal");
var EuiPopcalTemplate = require("./templates/eui-popcal")["default"] || require("./templates/eui-popcal");

var EuiInitializer = require("./initializers/eui-initializer")["default"] || require("./initializers/eui-initializer");
var EuiWaiAriaInitializer = require("./initializers/eui-wai-aria-initializer")["default"] || require("./initializers/eui-wai-aria-initializer");


Ember.Application.initializer(EuiInitializer);
Ember.Application.initializer(EuiWaiAriaInitializer);

Ember.libraries.register("EmberUI", "0.3.6");

Ember.TextSupport.reopen({
    attributeBindings: [
      'aria-expanded',
      'aria-autocomplete',
      'aria-owns',
      'aria-activedescendant'
    ]
});

exports.EuiInitializer = EuiInitializer;
exports.EuiButtonComponent = EuiButtonComponent;
exports.EuiCheckboxComponent = EuiCheckboxComponent;
exports.EuiDropbuttonComponent = EuiDropbuttonComponent;
exports.EuiInputComponent = EuiInputComponent;
exports.EuiInputTemplate = EuiInputTemplate;
exports.EuiModalComponent = EuiModalComponent;
exports.EuiPoplistComponent = EuiPoplistComponent;
exports.EuiSelectComponent = EuiSelectComponent;
exports.EuiSelectDateComponent = EuiSelectDateComponent;
exports.EuiTextareaComponent = EuiTextareaComponent;
exports.EuiMonthComponent = EuiMonthComponent;
exports.EuiCalendarComponent = EuiCalendarComponent;
exports.EuiPopcalComponent = EuiPopcalComponent;