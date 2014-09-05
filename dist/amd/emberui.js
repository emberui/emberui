define(
  ["./components/eui-button","./templates/eui-button","./components/eui-checkbox","./templates/eui-checkbox","./components/eui-dropbutton","./templates/eui-dropbutton","./components/eui-input","./templates/eui-input","./components/eui-modal","./templates/eui-modal","./components/eui-poplist","./templates/eui-poplist","./templates/eui-poplist-option","./components/eui-select","./templates/eui-select","./components/eui-selectdate","./templates/eui-selectdate","./components/eui-textarea","./templates/eui-textarea","./components/eui-month","./components/eui-calendar","./templates/eui-calendar","./components/eui-popcal","./templates/eui-popcal","./initializers/eui-initializer","./initializers/eui-wai-aria-initializer","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __dependency22__, __dependency23__, __dependency24__, __dependency25__, __dependency26__, __exports__) {
    "use strict";
    /*!
    EmberUI (c) 2014 Jaco Joubert
    License: https://github.com/emberui/emberui/blob/master/LICENSE
    */

    var EuiButtonComponent = __dependency1__["default"] || __dependency1__;
    var EuiButtonTemplate = __dependency2__["default"] || __dependency2__;

    var EuiCheckboxComponent = __dependency3__["default"] || __dependency3__;
    var EuiCheckboxTemplate = __dependency4__["default"] || __dependency4__;

    var EuiDropbuttonComponent = __dependency5__["default"] || __dependency5__;
    var EuiDropbuttonTemplate = __dependency6__["default"] || __dependency6__;

    var EuiInputComponent = __dependency7__["default"] || __dependency7__;
    var EuiInputTemplate = __dependency8__["default"] || __dependency8__;

    var EuiModalComponent = __dependency9__["default"] || __dependency9__;
    var EuiModalTemplate = __dependency10__["default"] || __dependency10__;

    var EuiPoplistComponent = __dependency11__["default"] || __dependency11__;
    var EuiPoplistTemplate = __dependency12__["default"] || __dependency12__;
    var EuiPoplistOptionTemplate = __dependency13__["default"] || __dependency13__;

    var EuiSelectComponent = __dependency14__["default"] || __dependency14__;
    var EuiSelectTemplate = __dependency15__["default"] || __dependency15__;

    var EuiSelectDateComponent = __dependency16__["default"] || __dependency16__;
    var EuiSelectDateTemplate = __dependency17__["default"] || __dependency17__;

    var EuiTextareaComponent = __dependency18__["default"] || __dependency18__;
    var EuiTextareaTemplate = __dependency19__["default"] || __dependency19__;

    var EuiMonthComponent = __dependency20__["default"] || __dependency20__;

    var EuiCalendarComponent = __dependency21__["default"] || __dependency21__;
    var EuiCalendarTemplate = __dependency22__["default"] || __dependency22__;

    var EuiPopcalComponent = __dependency23__["default"] || __dependency23__;
    var EuiPopcalTemplate = __dependency24__["default"] || __dependency24__;

    var EuiInitializer = __dependency25__["default"] || __dependency25__;
    var EuiWaiAriaInitializer = __dependency26__["default"] || __dependency26__;


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

    __exports__.EuiInitializer = EuiInitializer;
    __exports__.EuiButtonComponent = EuiButtonComponent;
    __exports__.EuiCheckboxComponent = EuiCheckboxComponent;
    __exports__.EuiDropbuttonComponent = EuiDropbuttonComponent;
    __exports__.EuiInputComponent = EuiInputComponent;
    __exports__.EuiInputTemplate = EuiInputTemplate;
    __exports__.EuiModalComponent = EuiModalComponent;
    __exports__.EuiPoplistComponent = EuiPoplistComponent;
    __exports__.EuiSelectComponent = EuiSelectComponent;
    __exports__.EuiSelectDateComponent = EuiSelectDateComponent;
    __exports__.EuiTextareaComponent = EuiTextareaComponent;
    __exports__.EuiMonthComponent = EuiMonthComponent;
    __exports__.EuiCalendarComponent = EuiCalendarComponent;
    __exports__.EuiPopcalComponent = EuiPopcalComponent;
  });