"use strict";
var styleSupport = require("../mixins/style-support")["default"] || require("../mixins/style-support");
var modalLayout = require("../templates/eui-modal")["default"] || require("../templates/eui-modal");
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

exports["default"] = modal;