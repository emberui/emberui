define(
  ["./components/eui-button","./templates/eui-button","./components/eui-checkbox","./templates/eui-checkbox","./components/eui-dropbutton","./templates/eui-dropbutton","./components/eui-input","./templates/eui-input","./components/eui-modal","./templates/eui-modal","./components/eui-poplist","./templates/eui-poplist","./components/eui-select","./templates/eui-select","./components/eui-textarea","./templates/eui-textarea","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __exports__) {
    "use strict";
    /*!
    EmberUI (c) 2014 Jaco Joubert
    License: https://github.com/emberui/emberui/blob/master/LICENSE
    */

    var EuiButton = __dependency1__["default"] || __dependency1__;
    var EuiButtonTemplate = __dependency2__["default"] || __dependency2__;

    var EuiCheckbox = __dependency3__["default"] || __dependency3__;
    var EuiCheckboxTemplate = __dependency4__["default"] || __dependency4__;

    var EuiDropbutton = __dependency5__["default"] || __dependency5__;
    var EuiDropbuttonTemplate = __dependency6__["default"] || __dependency6__;

    var EuiInput = __dependency7__["default"] || __dependency7__;
    var EuiInputTemplate = __dependency8__["default"] || __dependency8__;

    var EuiModal = __dependency9__["default"] || __dependency9__;
    var EuiModalTemplate = __dependency10__["default"] || __dependency10__;

    var EuiPoplist = __dependency11__["default"] || __dependency11__;
    var EuipoplistTemplate = __dependency12__["default"] || __dependency12__;

    var EuiSelect = __dependency13__["default"] || __dependency13__;
    var EuiSelectTemplate = __dependency14__["default"] || __dependency14__;

    var EuiTextarea = __dependency15__["default"] || __dependency15__;
    var EuiTextareaTemplate = __dependency16__["default"] || __dependency16__;


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

    __exports__.EuiButtonComponent = EuiButtonComponent;
    __exports__.EuiCheckboxComponent = EuiCheckboxComponent;
    __exports__.EuiDropbuttonComponent = EuiDropbuttonComponent;
    __exports__.EuiInputComponent = EuiInputComponent;
    __exports__.EuiModalComponent = EuiModalComponent;
    __exports__.EuiPoplistComponent = EuiPoplistComponent;
    __exports__.EuiSelectComponent = EuiSelectComponent;
    __exports__.EuiTextareaComponent = EuiTextareaComponent;
  });