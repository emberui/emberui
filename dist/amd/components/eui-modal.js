define(
  ["../mixins/style-support","../mixins/animation-support","../templates/eui-modal","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var animationSupport = __dependency2__["default"] || __dependency2__;
    var modalLayout = __dependency3__["default"] || __dependency3__;
    var modal;

    modal = Em.Component.extend(styleSupport, animationSupport, {
      layout: 'eui-modal',
      tagName: 'eui-modal',
      classNames: ['eui-modal'],
      classNameBindings: ['class'],
      attributeBindings: ['tabindex'],
      "class": null,
      animationClass: 'euiModal',
      previousFocus: null,
      tabindex: 0,
      programmatic: false,
      isClosing: false,
      renderModal: false,
      enforceModality: false,
      open: Ember.computed(function(key, value) {
        if (arguments.length === 2) {
          if (value) {
            this.set('renderModal', value);
            Em.run.next(this, function() {
              return this.setup();
            });
          } else if (this.get('renderModal')) {
            this.hide();
          }
          return value;
        } else {
          value = this.get('renderModal');
          return value;
        }
      }).property('renderModal'),
      hide: function() {
        return this.animateOut({
          complete: (function(_this) {
            return function() {
              return _this.breakdown();
            };
          })(this)
        });
      },
      didInsertElement: function() {
        if (this.get('programmatic')) {
          return this.setup();
        }
      },
      setup: function() {
        this.animateIn();
        this.set('previousFocus', $(document.activeElement));
        this.$().focus();
        return $('body').toggleClass('eui-modal-open');
      },
      breakdown: function() {
        var _ref;
        if ((_ref = this.get('previousFocus')) != null) {
          _ref.focus();
        }
        $('body').toggleClass('eui-modal-open');
        if (this.get('programmatic')) {
          return this.destroy();
        } else {
          return this.set('renderModal', false);
        }
      },
      willDestroy: function() {
        return $('body').removeClass('eui-modal-open');
      },
      constrainTabNavigationToModal: function(event) {
        var activeElement, finalTabbable, leavingFinalTabbable, tabbable;
        if (!this.get('open')) {
          return;
        }
        activeElement = document.activeElement;
        tabbable = this.$(':tabbable');
        finalTabbable = tabbable[event.shiftKey && 'first' || 'last']()[0];
        leavingFinalTabbable = finalTabbable === activeElement || this.get('element') === activeElement && event.shiftKey;
        if (!leavingFinalTabbable) {
          return;
        }
        event.preventDefault();
        return tabbable[event.shiftKey && 'last' || 'first']()[0].focus();
      },
      actions: {
        cancel: function(context) {
          this.sendAction('cancel', context);
          return this.hide();
        },
        accept: function(context) {
          this.sendAction('accept', context);
          return this.hide();
        }
      },
      keyDown: function(event) {
        if (event.keyCode === 9) {
          return this.constrainTabNavigationToModal(event);
        }
      },
      keyUp: function(event) {
        if (event.keyCode === 27) {
          this.sendAction('cancel');
          if (!this.get('enforceModality')) {
            return this.hide();
          }
        }
      }
    });

    modal.reopenClass({
      show: function(options) {
        if (options == null) {
          options = {};
        }
        options.renderModal = true;
        options.programmatic = true;
        options.layout = modalLayout;
        modal = this.create(options);
        modal.container = modal.get('targetObject.container');
        modal.appendTo('body');
        return modal;
      }
    });

    __exports__["default"] = modal;
  });