"use strict";
var validationsupport;

validationsupport = Em.Mixin.create({
  classNameBindings: ['errorState:eui-error'],
  errorState: null,
  errorMessage: null,
  forceValidate: false,
  validateField: function(type) {
    var error, forceValidate, value;
    error = this.get('error');
    value = this.get('value');
    forceValidate = this.get('forceValidate');
    if (type === 'onload' && !value && !forceValidate) {
      return;
    }
    if (Ember.isArray(error)) {
      error = error[0];
    }
    if (error) {
      this.set('errorState', true);
      if (error && typeof error !== 'boolean') {
        return this.set('errorMessage', error);
      }
    } else {
      this.set('errorState', false);
      return this.set('errorMessage', null);
    }
  },
  focusOut: function() {
    return this.validateField();
  },
  onChange: (function() {
    if (this.get('errorState')) {
      return Ember.run.once(this, 'validateField');
    }
  }).observes('value'),
  forceValidation: (function() {
    return this.validateField();
  }).observes('forceValidate'),
  validateOnLoad: (function() {
    return this.validateField('onload');
  }).on('init')
});

exports["default"] = validationsupport;