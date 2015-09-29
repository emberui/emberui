import className from '../mixins/class-name';
import errorSupport from '../mixins/error-support';
import widthSupport from '../mixins/width-support';

export default Em.Component.extend(errorSupport, className, widthSupport, {
  classNameBindings: ['computedSize', 'computedStyle', 'class'],
  tagName: 'eui-input',

  baseClass: 'input',
  style: 'default',
  size: 'medium',

  width: null,
  disabled: null,
  class: null,
  required: null,
  error: null
});
