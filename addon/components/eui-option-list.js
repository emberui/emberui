import Ember from 'ember';
import className from '../mixins/class-name';

export default Ember.Component.extend(className, {
  classNames: ['eui-option-list'],
  attributeBindings: ['tabindex'],
  tagName: 'eui-option-list',

  baseClass: 'option-list',
  style: 'default',

  options: null,
  highlights: null
});
