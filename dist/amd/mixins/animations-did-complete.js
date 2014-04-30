define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var animationsDidComplete;

    animationsDidComplete = Em.Mixin.create({
      animationsDidComplete: function() {
        var promise;
        promise = new Em.RSVP.Promise((function(_this) {
          return function(resolve, reject) {
            var animatedElements, animation, cssRule, domPrefixes, element, elements, prefix, primaryElement, _i, _j, _len, _len1;
            animation = false;
            primaryElement = _this.$();
            animatedElements = _this.$().find('.eui-animation');
            elements = $.merge(primaryElement, animatedElements);
            domPrefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
            for (_i = 0, _len = elements.length; _i < _len; _i++) {
              element = elements[_i];
              if (animation) {
                break;
              }
              for (_j = 0, _len1 = domPrefixes.length; _j < _len1; _j++) {
                prefix = domPrefixes[_j];
                cssRule = $(element).css(prefix + 'animationName');
                if (cssRule && cssRule !== 'none') {
                  animation = true;
                }
                if (animation) {
                  break;
                }
              }
            }
            if (animation) {
              return _this.$().one('webkitAnimationEnd mozAnimationEnd oanimationend msAnimationEnd animationend', function() {
                return resolve(_this);
              });
            } else {
              return resolve(_this);
            }
          };
        })(this));
        return promise;
      }
    });

    __exports__["default"] = animationsDidComplete;
  });