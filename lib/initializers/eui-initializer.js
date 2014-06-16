import '../utilities/tabbable-selector';
import '../utilities/position';
import '../animations/popcal-close-default';
import '../animations/popcal-open-default';
import '../animations/modal-close-default';
import '../animations/modal-open-default';
import '../animations/modal-close-full';
import '../animations/modal-open-full';
import '../animations/poplist-close-default';
import '../animations/poplist-open-default';
import '../animations/poplist-close-flyin';
import '../animations/poplist-open-flyin';

import EuiButtonComponent from '../components/eui-button';
import EuiButtonTemplate from '../templates/eui-button';

import EuiCheckboxComponent from '../components/eui-checkbox';
import EuiCheckboxTemplate from '../templates/eui-checkbox';

import EuiDropbuttonComponent from '../components/eui-dropbutton';
import EuiDropbuttonTemplate from '../templates/eui-dropbutton';

import EuiInputComponent from '../components/eui-input';
import EuiInputTemplate from '../templates/eui-input';

import EuiModalComponent from '../components/eui-modal';
import EuiModalTemplate from '../templates/eui-modal';

import EuiPoplistComponent from '../components/eui-poplist';
import EuiPoplistTemplate from '../templates/eui-poplist';
import EuiPoplistOptionTemplate from '../templates/eui-poplist-option';

import EuiSelectComponent from '../components/eui-select';
import EuiSelectTemplate from '../templates/eui-select';

import EuiSelectDateComponent from '../components/eui-selectdate';
import EuiSelectDateTemplate from '../templates/eui-selectdate';

import EuiTextareaComponent from '../components/eui-textarea';
import EuiTextareaTemplate from '../templates/eui-textarea';

import EuiMonthComponent from '../components/eui-month';

import EuiCalendarComponent from '../components/eui-calendar';
import EuiCalendarTemplate from '../templates/eui-calendar';

import EuiPopcalComponent from '../components/eui-popcal';
import EuiPopcalTemplate from '../templates/eui-popcal';

export default {
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

    container.register('template:components/eui-modal', EuiModalTemplate);
    container.register('component:eui-modal', EuiModalComponent);

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
