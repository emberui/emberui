EmberUI.EuiButtonComponent = Ember.Component.extend({
  tagName: 'button',
  classNameBindings: [':eui-button', 'size', 'type'],
  attributeBindings: ['disabled'],

  size: 'eui-medium',

  type: 'eui-primary',

  disabled: function() {
    return this.get("disabled") || false;
  }
});
