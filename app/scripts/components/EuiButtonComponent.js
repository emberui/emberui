EmberUI.EuiButtonComponent = Ember.Component.extend({
  tagName: 'button',
  classNameBindings: [':eui-button', 'computedSize', 'computedType', 'loading:eui-loading'],
  attributeBindings: ['isDisabled:disabled'],

  computedSize: function() {
    return 'eui-' + (this.get('size') || 'medium');
  }.property('size'),

  computedType: function() {
    return 'eui-' + (this.get('type') || 'secondary');
  }.property('type'),

  isDisabled: function() {
    if (this.get('disabled') || this.get('loading')) return true;
  }.property('disabled', 'loading')
});
