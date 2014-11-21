define(
  ["../utilities/tabbable-selector","../utilities/position","../animations/popcal-close-default","../animations/popcal-open-default","../animations/poplist-close-default","../animations/poplist-open-default","../animations/poplist-close-flyin","../animations/poplist-open-flyin","../components/eui-button","../templates/eui-button","../components/eui-checkbox","../templates/eui-checkbox","../components/eui-dropbutton","../templates/eui-dropbutton","../components/eui-input","../templates/eui-input","../components/eui-poplist","../templates/eui-poplist","../templates/eui-poplist-option","../components/eui-select","../templates/eui-select","../components/eui-selectdate","../templates/eui-selectdate","../components/eui-textarea","../templates/eui-textarea","../components/eui-month","../components/eui-calendar","../templates/eui-calendar","../components/eui-popcal","../templates/eui-popcal","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __dependency22__, __dependency23__, __dependency24__, __dependency25__, __dependency26__, __dependency27__, __dependency28__, __dependency29__, __dependency30__, __exports__) {
    "use strict";

    var EuiButtonComponent = __dependency9__["default"] || __dependency9__;
    var EuiButtonTemplate = __dependency10__["default"] || __dependency10__;

    var EuiCheckboxComponent = __dependency11__["default"] || __dependency11__;
    var EuiCheckboxTemplate = __dependency12__["default"] || __dependency12__;

    var EuiDropbuttonComponent = __dependency13__["default"] || __dependency13__;
    var EuiDropbuttonTemplate = __dependency14__["default"] || __dependency14__;

    var EuiInputComponent = __dependency15__["default"] || __dependency15__;
    var EuiInputTemplate = __dependency16__["default"] || __dependency16__;

    var EuiPoplistComponent = __dependency17__["default"] || __dependency17__;
    var EuiPoplistTemplate = __dependency18__["default"] || __dependency18__;
    var EuiPoplistOptionTemplate = __dependency19__["default"] || __dependency19__;

    var EuiSelectComponent = __dependency20__["default"] || __dependency20__;
    var EuiSelectTemplate = __dependency21__["default"] || __dependency21__;

    var EuiSelectDateComponent = __dependency22__["default"] || __dependency22__;
    var EuiSelectDateTemplate = __dependency23__["default"] || __dependency23__;

    var EuiTextareaComponent = __dependency24__["default"] || __dependency24__;
    var EuiTextareaTemplate = __dependency25__["default"] || __dependency25__;

    var EuiMonthComponent = __dependency26__["default"] || __dependency26__;

    var EuiCalendarComponent = __dependency27__["default"] || __dependency27__;
    var EuiCalendarTemplate = __dependency28__["default"] || __dependency28__;

    var EuiPopcalComponent = __dependency29__["default"] || __dependency29__;
    var EuiPopcalTemplate = __dependency30__["default"] || __dependency30__;

    __exports__["default"] = {
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
  });