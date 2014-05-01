"use strict";
var modalBehaviour;

modalBehaviour = Em.Mixin.create({
  classNameBindings: ['class', 'isClosing:eui-closing'],
  attributeBindings: ['tabindex'],
  previousFocus: null,
  tabindex: 0,
  programmatic: false,
  isClosing: false,
  renderModal: false,
  open: Ember.computed(function(key, value) {
    if (arguments.length === 2) {
      if (value) {
        this.set('renderModal', value);
      } else {
        if (this.get('renderModal')) {
          this.hide();
        }
      }
      return value;
    } else {
      value = this.get('renderModal');
      return value;
    }
  }).property('renderModal'),
  didInsertElement: function() {
    if (this.get('programmatic')) {
      this.set('previousFocus', $(document.activeElement));
      this.$().focus();
      return $('body').toggleClass('eui-modal-open');
    }
  },
  didOpenModal: (function() {
    if (this.get('renderModal')) {
      this.$().focus();
      return $('body').toggleClass('eui-modal-open');
    }
  }).observes('renderModal'),
  hide: function() {
    this.set('isClosing', true);
    return this.animationsDidComplete().then((function(_this) {
      return function() {
        return _this.remove();
      };
    })(this));
  },
  remove: function() {
    var _ref;
    if ((_ref = this.get('previousFocus')) != null) {
      _ref.focus();
    }
    $('body').toggleClass('eui-modal-open');
    if (this.get('programmatic')) {
      return this.destroy();
    } else {
      return this.setProperties({
        isClosing: false,
        renderModal: false
      });
    }
  },
  willDestroy: function() {
    return $('body').removeClass('eui-modal-open');
  },
  constrainTabNavigationToModal: function(event) {
    var activeElement, finalTabbable, leavingFinalTabbable, tabbable;
    activeElement = document.activeElement;
    tabbable = this.$(':tabbable');
    finalTabbable = tabbable[event.shiftKey && 'first' || 'last']()[0];
    leavingFinalTabbable = finalTabbable === activeElement || this.get('element') === activeElement;
    if (!leavingFinalTabbable) {
      return;
    }
    event.preventDefault();
    return tabbable[event.shiftKey && 'last' || 'first']()[0].focus();
  }
});

exports["default"] = modalBehaviour;