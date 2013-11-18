EmberUI.EuiInputComponent = Ember.Component.extend({
  tagName: 'div',
  classNameBindings: [':eui-input', 'computedSize', 'computedStyle', 'class', 'computedErrorState:eui-error'],
  attributeBindings: ['computedWidth:style'],

  style: null,
  size: null,
  width: null,
  name: null,
  disabled: null,
  maxlength: null,
  tabindex: null,
  placeholder: null,
  value: null,
  class: null,
  required: null,
  hasError: null,
  errorMessage: null,
  inputId: null,

  // We need to bind the value of the label to the input's id because IE8 and IE9 doesn't support pointer-events: none;
  didInsertElement: function() {
    this.set('inputId', this.$('input').attr('id'));
  },

  computedSize: function() {
    return 'eui-' + (this.get('size') || 'medium');
  }.property('size'),

  computedStyle: function() {
    return 'eui-' + (this.get('style') || 'default');
  }.property('style'),

  computedWidth: function() {
    var widths = {'tiny': '100px', 'small': '150px', 'medium': '200px', 'large': '250px'};
    return 'width: ' + (this.get('width') || widths[this.get('size')] || widths['medium']);
  }.property('style', 'size'),

  placeholderVisible: function() {
    var placeholder = this.get('placeholder');
    var value = this.get('value');
    if (placeholder && !value) return true;
  }.property('placeholder', 'value'),

  computedErrorState: null,
  computedErrorMessage: null,

  validateField: function(type) {
    var hasError = this.get('hasError');
    var errorMessage = this.get('errorMessage');
    var required = this.get('required');
    var value = this.get('value');

    if (type === 'onload' && value === null) return;

    if (hasError || errorMessage || (required && !value)) {
      this.set('computedErrorState', true);

      // Because hasError can either be true or contain an error message we need to check which it is
      if (hasError && typeof(hasError) !== 'boolean' ) {
        this.set('computedErrorMessage', hasError);

      } else if (errorMessage) {
        this.set('computedErrorMessage', errorMessage);
      }

    } else {
      this.set('computedErrorState', false);
      this.set('computedErrorMessage', null);
    }
  },

  focusOut: function() {
    this.validateField();
  },

  validateOnLoad: function() {
    this.validateField('onload');
  }.on('init')
});
