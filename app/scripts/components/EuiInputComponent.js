EmberUI.EuiInputComponent = Ember.Component.extend({
  tagName: 'div',
  classNameBindings: [':eui-input', 'computedSize', 'computedStyle', 'class'],

  style: null,
  size: null,
  disabled: null,
  value: null,
  class: null,

  computedSize: function() {
    return 'eui-' + (this.get('size') || 'medium');
  }.property('size'),

  computedStyle: function() {
    return 'eui-' + (this.get('type') || 'default');
  }.property('type')
});
