EmberUI.EuiInputComponent = Ember.Component.extend({
  tagName: 'div',
  classNameBindings: [':eui-input', 'computedSize', 'computedStyle', 'class'],
  attributeBindings: ['computedWidth:style'],

  style: null,
  size: null,
  width: null,
  name: null,
  pattern: null,
  disabled: null,
  maxlength: null,
  tabindex: null,
  placeholder: null,
  value: null,
  class: null,

  computedSize: function() {
    return 'eui-' + (this.get('size') || 'medium');
  }.property('size'),

  computedStyle: function() {
    return 'eui-' + (this.get('type') || 'default');
  }.property('type'),

  computedWidth: function() {
    var widths = {'tiny': '100px', 'small': '150px', 'medium': '200px', 'large': '250px'};
    return 'width: ' + (this.get('width') || widths[this.get('size')] || widths['medium']);
  }.property('type', 'size')
});
