"use strict";
/*!
EmberUI (c) 2014 Jaco Joubert
License: https://github.com/emberui/emberui/blob/master/LICENSE
*/

var EuiButton = require("./components/eui-button")["default"] || require("./components/eui-button");
var EuiButtonTemplate = require("./templates/eui-button")["default"] || require("./templates/eui-button");

var EuiCheckbox = require("./components/eui-checkbox")["default"] || require("./components/eui-checkbox");
var EuiCheckboxTemplate = require("./templates/eui-checkbox")["default"] || require("./templates/eui-checkbox");

var EuiDropbutton = require("./components/eui-dropbutton")["default"] || require("./components/eui-dropbutton");
var EuiDropbuttonTemplate = require("./templates/eui-dropbutton")["default"] || require("./templates/eui-dropbutton");

var EuiInput = require("./components/eui-input")["default"] || require("./components/eui-input");
var EuiInputTemplate = require("./templates/eui-input")["default"] || require("./templates/eui-input");

var EuiModal = require("./components/eui-modal")["default"] || require("./components/eui-modal");
var EuiModalTemplate = require("./templates/eui-modal")["default"] || require("./templates/eui-modal");

var EuiPoplist = require("./components/eui-poplist")["default"] || require("./components/eui-poplist");
var EuipoplistTemplate = require("./templates/eui-poplist")["default"] || require("./templates/eui-poplist");

var EuiSelect = require("./components/eui-select")["default"] || require("./components/eui-select");
var EuiSelectTemplate = require("./templates/eui-select")["default"] || require("./templates/eui-select");

var EuiTextarea = require("./components/eui-textarea")["default"] || require("./components/eui-textarea");
var EuiTextareaTemplate = require("./templates/eui-textarea")["default"] || require("./templates/eui-textarea");


Application.initializer({
  name: 'ember-ui',

  initialize: function(container) {
    container.register('template:components/eui-button', EuiButtonTemplate);
    container.register('component:eui-button', EuiButtonComponent);

    container.register('template:components/eui-checkbox', EuiCheckboxTemplate);
    container.register('component:eui-checkbox', EuiCheckboxComponent);

    container.register('template:components/eui-dropbutton', EuiDropbuttonTemplate);
    container.register('component:eui-dropbutton', EuiDropbuttonComponent);

    container.register('template:components/eui-input', EuiInputTemplate);
    container.register('component:eui-input', EuiInputComponent);

    container.register('template:components/eui-modal', EuiModalTemplate);
    container.register('component:eui-modal', EuiModalComponent);

    container.register('template:components/eui-poplist', EuiPoplistTemplate);
    container.register('component:eui-poplist', EuiPoplistComponent);

    container.register('template:components/eui-select', EuiSelectTemplate);
    container.register('component:eui-select', EuiSelectComponent);

    container.register('template:components/eui-textarea', EuiTextareaTemplate);
    container.register('component:eui-textarea', EuiTextareaComponent);
  }
});

exports.EuiButtonComponent = EuiButtonComponent;
exports.EuiCheckboxComponent = EuiCheckboxComponent;
exports.EuiDropbuttonComponent = EuiDropbuttonComponent;
exports.EuiInputComponent = EuiInputComponent;
exports.EuiModalComponent = EuiModalComponent;
exports.EuiPoplistComponent = EuiPoplistComponent;
exports.EuiSelectComponent = EuiSelectComponent;
exports.EuiTextareaComponent = EuiTextareaComponent;