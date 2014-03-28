define(
  ["../mixins/style-support","../templates/eui-modal","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var styleSupport = __dependency1__["default"] || __dependency1__;
    var modalLayout = __dependency2__["default"] || __dependency2__;
    var modal;

    modal = Em.Component.extend(styleSupport, {
      layout: modalLayout,
      classNames: ['eui-modal'],
      classNameBindings: ['class', 'isOpen::eui-closing'],
      content: null,
      "class": null,
      isOpen: null,
      actions: {
        closeModal: function() {
          return this.hide();
        }
      },
      hide: function() {
        var animation, domPrefixes, prefix, _i, _len;
        this.set('isOpen', false);
        animation = false;
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
        if (this.$().css('animationName')) {
          animation = true;
        }
        for (_i = 0, _len = domPrefixes.length; _i < _len; _i++) {
          prefix = domPrefixes[_i];
          if (this.$().css(prefix + 'animationName')) {
            animation = true;
          }
        }
        if (animation) {
          return this.$().one('webkitAnimationEnd mozAnimationEnd oanimationend msAnimationEnd animationend', (function(_this) {
            return function() {
              return _this.destroy();
            };
          })(this));
        } else {
          return this.destroy();
        }
      },
      didInsertElement: function() {
        return this.set('isOpen', true);
      }
    });

    modal.reopenClass({
      show: function(options) {
        if (options == null) {
          options = {};
        }
        modal = this.create(options);
        modal.container = modal.get('targetObject.container');
        modal.appendTo('body');
        return modal;
      }
    });

    __exports__["default"] = modal;
  });