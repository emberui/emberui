"use strict";
require("../utilities/tabbable-selector");require("../utilities/position");require("../animations/popcal-close-default");require("../animations/popcal-open-default");require("../animations/poplist-close-default");require("../animations/poplist-open-default");require("../animations/poplist-close-flyin");require("../animations/poplist-open-flyin");
var EuiButtonComponent = require("../components/eui-button")["default"] || require("../components/eui-button");
var EuiButtonTemplate = require("../templates/eui-button")["default"] || require("../templates/eui-button");

var EuiCheckboxComponent = require("../components/eui-checkbox")["default"] || require("../components/eui-checkbox");
var EuiCheckboxTemplate = require("../templates/eui-checkbox")["default"] || require("../templates/eui-checkbox");

var EuiDropbuttonComponent = require("../components/eui-dropbutton")["default"] || require("../components/eui-dropbutton");
var EuiDropbuttonTemplate = require("../templates/eui-dropbutton")["default"] || require("../templates/eui-dropbutton");

var EuiInputComponent = require("../components/eui-input")["default"] || require("../components/eui-input");
var EuiInputTemplate = require("../templates/eui-input")["default"] || require("../templates/eui-input");

var EuiPoplistComponent = require("../components/eui-poplist")["default"] || require("../components/eui-poplist");
var EuiPoplistTemplate = require("../templates/eui-poplist")["default"] || require("../templates/eui-poplist");
var EuiPoplistOptionTemplate = require("../templates/eui-poplist-option")["default"] || require("../templates/eui-poplist-option");

var EuiSelectComponent = require("../components/eui-select")["default"] || require("../components/eui-select");
var EuiSelectTemplate = require("../templates/eui-select")["default"] || require("../templates/eui-select");

var EuiSelectDateComponent = require("../components/eui-selectdate")["default"] || require("../components/eui-selectdate");
var EuiSelectDateTemplate = require("../templates/eui-selectdate")["default"] || require("../templates/eui-selectdate");

var EuiTextareaComponent = require("../components/eui-textarea")["default"] || require("../components/eui-textarea");
var EuiTextareaTemplate = require("../templates/eui-textarea")["default"] || require("../templates/eui-textarea");

var EuiMonthComponent = require("../components/eui-month")["default"] || require("../components/eui-month");

var EuiCalendarComponent = require("../components/eui-calendar")["default"] || require("../components/eui-calendar");
var EuiCalendarTemplate = require("../templates/eui-calendar")["default"] || require("../templates/eui-calendar");

var EuiPopcalComponent = require("../components/eui-popcal")["default"] || require("../components/eui-popcal");
var EuiPopcalTemplate = require("../templates/eui-popcal")["default"] || require("../templates/eui-popcal");

exports["default"] = {
  name: 'emberui',

  initialize: function(container) {
    container.register('template:components/eui-button', EuiButtonTemplate);
    container.register('component:eui-button', EuiButtonComponent);

    container.register('template:components/eui-checkbox', EuiCheckboxTemplate);
    container.register('component:eui-checkbox', EuiCheckboxComponent);

    container.register('template:components/eui-dropbutton', EuiDropbuttonTemplate);
    container.register('component:eui-dropbutton', EuiDropbuttonComponent);

    container.register('template:components/eui-input', EuiInputTemplate);
    container.register('component:eui-input', EuiInputComponent);

    container.register('template:components/eui-poplist', EuiPoplistTemplate);
    container.register('template:components/eui-poplist-opion', EuiPoplistOptionTemplate);
    container.register('component:eui-poplist', EuiPoplistComponent);

    container.register('template:components/eui-select', EuiSelectTemplate);
    container.register('component:eui-select', EuiSelectComponent);

    container.register('template:components/eui-selectdate', EuiSelectDateTemplate);
    container.register('component:eui-selectdate', EuiSelectDateComponent);

    container.register('template:components/eui-popcal', EuiPopcalTemplate);
    container.register('component:eui-popcal', EuiPopcalComponent);

    container.register('template:components/eui-textarea', EuiTextareaTemplate);
    container.register('component:eui-textarea', EuiTextareaComponent);

    container.register('component:eui-month', EuiMonthComponent);

    container.register('template:components/eui-calendar', EuiCalendarTemplate);
    container.register('component:eui-calendar', EuiCalendarComponent);
  }
};