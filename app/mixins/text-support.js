// Shared mixin used by input and textarea
export default Ember.Mixin.create({
  tagName: 'div',
  classNameBindings: ['computedSize', 'computedStyle', 'class', 'computedErrorState:eui-error'],

  style: null,
  size: null,
  width: null,
  name: null,
  disabled: null,
  tabindex: null,
  placeholder: null,
  value: null,
  class: null,
  required: null,
  hasError: null,
  errorMessage: null,
  inputId: null,

  // We need to bind the value of the label to the textarea's id because IE8 and IE9 doesn't support pointer-events: none;
  didInsertElement: function() {
    this.set('inputId', this.$('textarea').attr('id'));
  },

  computedSize: function() {
    return 'eui-' + (this.get('size') || 'medium');
  }.property('size'),

  computedStyle: function() {
    return 'eui-' + (this.get('style') || 'default');
  }.property('style'),

  placeholderVisible: function() {
    var placeholder = this.get('placeholder');
    var value = this.get('value');
    if (placeholder && !value) return true;
  }.property('placeholder', 'value')
});
