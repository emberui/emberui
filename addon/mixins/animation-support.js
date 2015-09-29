import Ember from 'ember';

export default Ember.Mixin.create({
  animationStyle: null,
  animationClass: null,

  openAnimation: Ember.computed('computedAnimationStyle', function() {
    const component = this.get('animationClass');
    let style = this.get('computedAnimationStyle');

    if (!(style && component)) {
      return;
    }

    style = component + "Open" + style;

    if ($.Velocity.Redirects.hasOwnProperty(style)) {
      return style;
    } else {
      return component + "OpenDefault";
    }
  }),

  closeAnimation: Ember.computed('computedAnimationStyle', function() {
    const component = this.get('animationClass');
    let style = this.get('computedAnimationStyle');

    if (!(style && component)) {
      return;
    }

    style = component + "Close" + style;

    if ($.Velocity.Redirects.hasOwnProperty(style)) {
      return style;
    } else {
      return component + "CloseDefault";;
    }
  }),

  computedAnimationStyle: Ember.computed('animationStyle', 'style', function() {
    let style = (this.get('animationStyle') || '').capitalize();

    if (!style) {
      style = (this.get('style') || '').capitalize();
    }

    return style;
  }),

  animateIn(options) {
    const openAnimation = this.get('openAnimation');

    if (!openAnimation) {
      return;
    }

    if (!options) {
      options = {};
    }

    return Em.run.next(this, function() {
      return this.$().velocity(openAnimation, options);
    });
  },

  animateOut(options) {
    const closeAnimation = this.get('closeAnimation');

    if (!closeAnimation) {
      return;
    }

    if (!options) {
      options = {};
    }

    return this.$().velocity(closeAnimation, options);
  }
});
