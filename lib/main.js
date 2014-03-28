/*!
EmberUI (c) 2014 Jaco Joubert
License: https://github.com/emberui/emberui/blob/master/LICENSE
*/

import EuiButton from './components/eui-button';
import EuiButtonTemplate from './templates/eui-button';

import EuiCheckbox from './components/eui-checkbox';
import EuiCheckboxTemplate from './templates/eui-checkbox';

import EuiDropbutton from './components/eui-dropbutton';
import EuiDropbuttonTemplate from './templates/eui-dropbutton';

import EuiInput from './components/eui-input';
import EuiInputTemplate from './templates/eui-input';

import EuiModal from './components/eui-modal';
import EuiModalTemplate from './templates/eui-modal';

import EuiPoplist from './components/eui-poplist';
import EuipoplistTemplate from './templates/eui-poplist';

import EuiSelect from './components/eui-select';
import EuiSelectTemplate from './templates/eui-select';

import EuiTextarea from './components/eui-textarea';
import EuiTextareaTemplate from './templates/eui-textarea';


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

export {
  EuiButtonComponent,
  EuiCheckboxComponent,
  EuiDropbuttonComponent,
  EuiInputComponent,
  EuiModalComponent,
  EuiPoplistComponent,
  EuiSelectComponent,
  EuiTextareaComponent
};
