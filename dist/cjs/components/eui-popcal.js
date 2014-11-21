"use strict";
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var animationSupport = require("../mixins/animation-support")["default"] || require("../mixins/animation-support");
var popcalLayout = require("../templates/eui-popcal")["default"] || require("../templates/eui-popcal");
var preventPageScroll = require("../mixins/prevent-page-scroll")["default"] || require("../mixins/prevent-page-scroll");
var popcal;

popcal = Em.Component.extend(styleSupport, animationSupport, preventPageScroll, {
  layout: popcalLayout,
  classNames: ['eui-popcal'],
  attributeBindings: ['tabindex'],
  tagName: 'eui-popcal',
  animationClass: 'euiPopcal',
  tabindex: 0,
  previousFocus: null,
  hide: function() {
    return this.animateOut({
      target: this.get('targetObject').$(),
      complete: (function(_this) {
        return function() {
          return _this.breakdown();
        };
      })(this)
    });
  },
  setup: (function() {
    this.animateIn();
    this.set('previousFocus', $(document.activeElement));
    this.set('isOpen', true);
    this.set('_selection', this.get('selection'));
    this.$().find('.eui-component').position({
      my: "center top",
      at: "center bottom",
      of: this.get('targetObject').$(),
      collision: 'flipfit'
    });
    this.$().focus();
    return this.disablePageScroll();
  }).on('didInsertElement'),
  breakdown: function() {
    var _ref;
    this.get('previousFocus').focus();
    this.set('isOpen', false);
    this.enablePageScroll();
    if (!(this.get('dateRange') && ((_ref = this.get('_selection')) != null ? _ref.get('length') : void 0) === 1)) {
      this.set('selection', this.get('_selection'));
    }
    return this.destroy();
  },
  actions: {
    closeCalendar: function() {
      var dateRange, selection;
      dateRange = this.get('dateRange');
      selection = this.get('_selection');
      if (dateRange) {
        if ((selection != null ? selection.get('length') : void 0) > 1) {
          return this.hide();
        }
      } else if (selection) {
        return this.hide();
      }
    },
    hidePopcal: function() {
      return this.hide();
    }
  },
  keyUp: function(event) {
    if (event.keyCode === 27) {
      return this.hide();
    }
  }
});

popcal.reopenClass({
  show: function(options) {
    if (options == null) {
      options = {};
    }
    popcal = this.create(options);
    popcal.container = popcal.get('targetObject.container');
    popcal.appendTo('.ember-application');
    return popcal;
  }
});

exports["default"] = popcal;