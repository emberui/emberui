export default Ember.Component.extend({
  tagName: 'button',
  classNameBindings: [':eui-button', 'computedSize', 'computedStyle', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class'],
  attributeBindings: ['isDisabled:disabled'],

  label: null,
  style: null,
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

  computedStyle: function() {
    return 'eui-' + (this.get('style') || 'secondary');
  }.property('style'),

  isDisabled: function() {
    if (this.get('disabled') || this.get('loading')) return true;
  }.property('disabled', 'loading'),

  click: function(event) {
    event.preventDefault();
    this.sendAction('action', this.get('context'));
  }
});
