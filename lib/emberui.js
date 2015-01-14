/*!
EmberUI (c) 2014 Jaco Joubert
License: https://github.com/emberui/emberui/blob/master/LICENSE
*/

import EuiButtonComponent from './components/eui-button';
import EuiButtonTemplate from './templates/eui-button';

import EuiCheckboxComponent from './components/eui-checkbox';
import EuiCheckboxTemplate from './templates/eui-checkbox';

import EuiDropbuttonComponent from './components/eui-dropbutton';
import EuiDropbuttonTemplate from './templates/eui-dropbutton';

import EuiInputComponent from './components/eui-input';
import EuiInputTemplate from './templates/eui-input';

import EuiPoplistComponent from './components/eui-poplist';
import EuiPoplistTemplate from './templates/eui-poplist';
import EuiPoplistOptionTemplate from './templates/eui-poplist-option';

import EuiSelectComponent from './components/eui-select';
import EuiSelectTemplate from './templates/eui-select';

import EuiSelectDateComponent from './components/eui-selectdate';
import EuiSelectDateTemplate from './templates/eui-selectdate';

import EuiTextareaComponent from './components/eui-textarea';
import EuiTextareaTemplate from './templates/eui-textarea';

import EuiMonthComponent from './components/eui-month';

import EuiCalendarComponent from './components/eui-calendar';
import EuiCalendarTemplate from './templates/eui-calendar';

import EuiPopcalComponent from './components/eui-popcal';
import EuiPopcalTemplate from './templates/eui-popcal';

import EuiInitializer from './initializers/eui-initializer';
import EuiWaiAriaInitializer from './initializers/eui-wai-aria-initializer';


Ember.Application.initializer(EuiInitializer);
Ember.Application.initializer(EuiWaiAriaInitializer);

Ember.libraries.register("EmberUI", "0.4.2");

Ember.TextSupport.reopen({
    attributeBindings: [
      'aria-expanded',
      'aria-autocomplete',
      'aria-owns',
      'aria-activedescendant'
    ]
});

export {
  EuiButtonComponent,
  EuiButtonTemplate,
  EuiCheckboxComponent,
  EuiCheckboxTemplate,
  EuiDropbuttonComponent,
  EuiDropbuttonTemplate,
  EuiInputComponent,
  EuiInputTemplate,
  EuiPoplistComponent,
  EuiPoplistTemplate,
  EuiPoplistOptionTemplate,
  EuiSelectComponent,
  EuiSelectTemplate,
  EuiSelectDateComponent,
  EuiSelectDateTemplate,
  EuiTextareaComponent,
  EuiTextareaTemplate,
  EuiMonthComponent,
  EuiCalendarComponent,
  EuiCalendarTemplate,
  EuiPopcalComponent,
  EuiPopcalTemplate,
  EuiInitializer,
  EuiWaiAriaInitializer
}
