define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var animationSupport;

    animationSupport = Em.Mixin.create({
      animationStyle: null,
      animationClass: null,
      openAnimation: Em.computed('computedAnimationStyle', function() {
        var backupStyle, component, style;
        style = this.get('computedAnimationStyle');
        component = this.get('animationClass');
        if (!(style && component)) {
          return;
        }
        style = "" + component + "Open" + style;
        backupStyle = "" + component + "OpenDefault";
        if ($.Velocity.Redirects.hasOwnProperty(style)) {
          return style;
        } else {
          return backupStyle;
        }
      }),
      closeAnimation: Em.computed('computedAnimationStyle', function() {
        var backupStyle, component, style;
        style = this.get('computedAnimationStyle');
        component = this.get('animationClass');
        if (!(style && component)) {
          return;
        }
        style = "" + component + "Close" + style;
        backupStyle = "" + component + "CloseDefault";
        if ($.Velocity.Redirects.hasOwnProperty(style)) {
          return style;
        } else {
          return backupStyle;
        }
      }),
      computedAnimationStyle: Em.computed('animationStyle', 'style', function() {
        var style, _ref, _ref1;
        style = (_ref = this.get('animationStyle')) != null ? _ref.capitalize() : void 0;
        if (!style) {
          style = (_ref1 = this.get('style')) != null ? _ref1.capitalize() : void 0;
        }
        return style;
      }),
      animateIn: function(options) {
        var openAnimation;
        if (!(openAnimation = this.get('openAnimation'))) {
          return;
        }
        if (!options) {
          options = {};
        }
        return Em.run.next(this, function() {
          return this.$().velocity(openAnimation, options);
        });
      },
      animateOut: function(options) {
        var closeAnimation;
        if (!(closeAnimation = this.get('closeAnimation'))) {
          return;
        }
        if (!options) {
          options = {};
        }
        return this.$().velocity(closeAnimation, options);
      }
    });

    __exports__["default"] = animationSupport;
  });