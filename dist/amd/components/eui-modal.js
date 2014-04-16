define(
  ["../mixins/style-support","../mixins/animations-did-complete","../templates/eui-modal","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var animationsDidComplete = __dependency2__["default"] || __dependency2__;
    var modalLayout = __dependency3__["default"] || __dependency3__;
    var modal;

    modal = Em.Component.extend(styleSupport, animationsDidComplete, {
      layout: modalLayout,
      tagName: 'eui-modal',
      classNames: ['eui-modal'],
      classNameBindings: ['class', 'isClosing:eui-closing'],
      attributeBindings: ['tabindex'],
      "class": null,
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
          this.constrainScrollEventsToModal();
          return this.$().focus();
        }
      },
      didOpenModal: (function() {
        this.constrainScrollEventsToModal();
        if (this.get('renderModal')) {
          return this.$().focus();
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
        this.$().unbind('.emberui');
        if (this.get('programmatic')) {
          return this.destroy();
        } else {
          return this.setProperties({
            isClosing: false,
            renderModal: false
          });
        }
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
          this.constrainTabNavigationToModal(event);
        }
        if (event.keyCode === 27) {
          this.sendAction('cancel');
          return this.hide();
        }
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
      },
      constrainScrollEventsToModal: function() {
        return this.$().bind('mousewheel.emberui DOMMouseScroll.emberui', (function(_this) {
          return function(e) {
            var canScroll, element, elements, _i, _j, _len, _len1;
            e.stopPropagation();
            element = $(e.target);
            elements = [];
            while (element.parent().prop('tagName') !== 'EUI-MODAL') {
              elements.pushObject(element);
              element = element.parent();
            }
            canScroll = false;
            if (e.originalEvent.wheelDelta >= 0) {
              for (_i = 0, _len = elements.length; _i < _len; _i++) {
                element = elements[_i];
                if (element.scrollTop() !== 0) {
                  canScroll = true;
                }
              }
            } else {
              for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
                element = elements[_j];
                if ((element.scrollTop() + element.innerHeight()) < element.prop('scrollHeight')) {
                  canScroll = true;
                  break;
                }
              }
            }
            if (!canScroll) {
              return e.preventDefault();
            }
          };
        })(this));
      }
    });

    modal.reopenClass({
      show: function(options) {
        if (options == null) {
          options = {};
        }
        options.renderModal = true;
        options.programmatic = true;
        modal = this.create(options);
        modal.container = modal.get('targetObject.container');
        modal.appendTo('body');
        return modal;
      }
    });

    __exports__["default"] = modal;
  });