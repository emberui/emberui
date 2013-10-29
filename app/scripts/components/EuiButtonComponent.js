EmberUI.EuiButtonComponent = Ember.Component.extend({
  tagName: 'button',
  classNameBindings: [':eui-button', 'computedSize', 'computedType', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class'],
  attributeBindings: ['isDisabled:disabled'],

  label: null,
  type: null,
  size: null,
  icon: null,
  trailingIcon: null,
  loading: null,
  disabled: null,
  action: null,
  class: null,

  computedSize: function() {
    return 'eui-' + (this.get('size') || 'medium');
  }.property('size'),

  computedType: function() {
    return 'eui-' + (this.get('type') || 'secondary');
  }.property('type'),

  isDisabled: function() {
    if (this.get('disabled') || this.get('loading')) return true;
  }.property('disabled', 'loading'),

  click: function() {
    this.sendAction();
  }
});
