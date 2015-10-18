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

  onChange: null,

  click() {
    if (this.get('disabled')) {
      return;
    }

    let onChange = this.get('onChange');

    if (onChange) {
      this.sendAction('onChange', !this.get('value'));

    } else {
      this.toggleProperty('value');
    }
  },

  // Error check should happen without user having to focus on component
  isEntered: true
});
