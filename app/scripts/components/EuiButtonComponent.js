EmberUI.EuiButtonComponent = Ember.Component.extend({
  tagName: 'button',
  classNameBindings: [':eui-button', 'computatedSize', 'computatedType'],
  attributeBindings: ['disabled'],

  computatedSize: function() {
    return 'eui-' + (this.get('size') || 'medium');
  }.property('size'),

  computatedType: function() {
    return 'eui-' + (this.get('type') || 'secondary');
  }.property('type')
});
