define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var validationsupport;

    validationsupport = Em.Mixin.create({
      classNameBindings: ['computedErrorState:eui-error'],
      computedErrorState: null,
      computedErrorMessage: null,
      validateField: function(type) {
        var error, required, value;
        error = this.get('error');
        required = this.get('required');
        value = this.get('value');
        if (type === 'onload' && !value) {
          return;
        }
        if (Ember.isArray(error)) {
          error = error[0];
        }
        if (error || (required && !value)) {
          this.set('computedErrorState', true);
          if (error && typeof error !== 'boolean') {
            return this.set('computedErrorMessage', error);
          }
        } else {
          this.set('computedErrorState', false);
          return this.set('computedErrorMessage', null);
        }
      },
      focusOut: function() {
        return this.validateField();
      },
      onChange: (function() {
        if (this.get('computedErrorState')) {
          return Ember.run.once(this, 'validateField');
        }
      }).observes('value'),
      validateOnLoad: (function() {
        return this.validateField('onload');
      }).on('init')
    });

    __exports__["default"] = validationsupport;
  });