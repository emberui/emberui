import Ember from 'ember';
import errorSupport from '../mixins/error-support';
import className from '../mixins/class-name';

export default Ember.Component.extend(errorSupport, className, {
  classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class'],
  attributeBindings: ['role', 'value:aria-checked', 'disabled:aria-disabled'],

  baseClass: 'checkbox',
  style: 'default',
  size: 'medium',
  tagName: 'eui-checkbox',

  role: 'checkbox',

  value: false,
  disabled: false,

  click() {
    if (!this.get('disabled')) {
      this.toggleProperty('value');
    }
  }
});
