define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var errorSupport;

    errorSupport = Em.Mixin.create({
      classNameBindings: ['errorState:eui-error'],
      forceErrorCheck: false,
      focusIn: function() {
        return this.set("isEntered", false);
      },
      focusOut: function() {
        return this.set("isEntered", true);
      },
      errorMessage: Em.computed('errorState', 'error', function() {
        var error;
        error = this.get('error');
        if (this.get('errorState') && typeof error === 'string') {
          return error;
        } else {
          return null;
        }
      }),
      errorState: Em.computed('isEntered', 'forceErrorCheck', 'error', 'value', function() {
        var errorState;
        errorState = this._errorState();
        this.set('_previousErrorState', errorState);
        return errorState;
      }),
      _errorState: function() {
        switch (this.get('_previousErrorState')) {
          case void 0:
            if (Em.isBlank(this.get('value')) && !this.get('forceErrorCheck')) {
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

    __exports__["default"] = errorSupport;
  });