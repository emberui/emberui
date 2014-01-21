export default Ember.Mixin.create({
  computedErrorState: null,
  computedErrorMessage: null,

  validateField: function(type) {
    var hasError = this.get('hasError');
    var required = this.get('required');
    var value = this.get('value');

    if (type === 'onload' && !value) return;

    // Error validation libraries may return an array of error messages so we only use the first
    if ($.isArray(hasError)) {
      hasError = hasError[0];
    }

    if (hasError || (required && !value)) {
      this.set('computedErrorState', true);

      if (hasError && typeof(hasError) !== 'boolean' ) {
        this.set('computedErrorMessage', hasError);
      }

    } else {
      this.set('computedErrorState', false);
      this.set('computedErrorMessage', null);
    }
  },

  focusOut: function() {
    this.validateField();
  },

  onChange: function() {
    if (this.get('computedErrorState')) Ember.run.once(this, 'validateField');
  }.observes('value'),

  validateOnLoad: function() {
    this.validateField('onload');
  }.on('init')
});
