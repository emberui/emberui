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

import EuiModalComponent from './components/eui-modal';
import EuiModalTemplate from './templates/eui-modal';

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

import './utilities/tabbable-selector';
import './utilities/position';
import './animations/popcal-close-default';
import './animations/popcal-open-default';
import './animations/modal-close-default';
import './animations/modal-open-default';
import './animations/modal-close-full';
import './animations/modal-open-full';
import './animations/poplist-close-default';
import './animations/poplist-open-default';
import './animations/poplist-close-flyin';
import './animations/poplist-open-flyin';

import EuiInitializer from './initializers/eui-initializer';


Ember.Application.initializer(EuiInitializer);

Ember.libraries.register("EmberUI", "0.1.3");

export {
  EuiInitializer,
  EuiButtonComponent,
  EuiCheckboxComponent,
  EuiDropbuttonComponent,
  EuiInputComponent,
  EuiInputTemplate,
  EuiModalComponent,
  EuiPoplistComponent,
  EuiSelectComponent,
  EuiSelectDateComponent,
  EuiTextareaComponent,
  EuiMonthComponent,
  EuiCalendarComponent,
  EuiPopcalComponent
}
