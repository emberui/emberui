EmberUI.ValidationSupport = Ember.Mixin.create({
  computedErrorState: null,
  computedErrorMessage: null,

  validateField: function(type) {
    var hasError = this.get('hasError');
    var errorMessage = this.get('errorMessage');
    var required = this.get('required');
    var value = this.get('value');

    if (type === 'onload' && !value) return;

    // We only ever show one error message at a time
    if ($.isArray(hasError)) {
      hasError = hasError[0];
    }

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

  onChange: function() {
    if (this.get('computedErrorState')) Ember.run.once(this, 'validateField');
  }.observes('value'),

  validateOnLoad: function() {
    this.validateField('onload');
  }.on('init')
});
