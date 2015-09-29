import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['errorState:eui-error'],
  forceErrorCheck: false,

  focusIn() {
    return this.set("isEntered", false);
  },

  focusOut() {
    return this.set("isEntered", true);
  },

  errorMessage: Ember.computed('errorState', 'error', function() {
    const error = this.get('error');

    if (this.get('errorState') && typeof error === 'string') {
      return error;
    } else {
      return null;
    }
  }),

  errorState: Ember.computed('isEntered', 'forceErrorCheck', 'error', 'value', function() {
    const errorState = this._errorState();
    this.set('_previousErrorState', errorState);
    return errorState;
  }),

  _errorState() {
    switch (this.get('_previousErrorState')) {
      case void 0:
        if (Ember.isBlank(this.get('value')) && !this.get('forceErrorCheck')) {
          return false;
        }
        break;
      case false:
        if (!this.get('isEntered') && !this.get('forceErrorCheck')) {
          return false;
        }
    }
    
    return !!this.get('error');
  }
});
