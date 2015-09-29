import className from '../mixins/class-name';
import disabledSupport from '../mixins/disabled-support';
import widthSupport from '../mixins/width-support';

export default Em.Component.extend(className, disabledSupport, widthSupport, {
  classNames: ['eui-button'],
  classNameBindings: ['loading:eui-loading', 'class'],
  attributeBindings: ['type'],
  baseClass: 'button',
  tagName: 'button',
  style: 'default',
  size: 'medium',

  loading: null,
  disabled: null,
  action: null,
  "class": null,
  type: 'button',
  width: 'auto',

  ariaOwns: null,
  ariaHaspopup: null,

  click(event) {
    event.preventDefault();
    this.sendAction('action', this.get('context'));
  }
});
