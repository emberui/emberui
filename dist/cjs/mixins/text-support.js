"use strict";
var textsupport;

textsupport = Em.Mixin.create({
  tagName: 'div',
  classNameBindings: ['computedSize', 'computedStyle', 'class'],
  width: null,
  name: null,
  disabled: null,
  tabindex: null,
  placeholder: null,
  value: null,
  "class": null,
  required: null,
  error: null,
  inputId: null,
  didInsertElement: function() {
    return this.set('inputId', this.$('input').attr('id') || this.$('textarea').attr('id'));
  },
  placeholderVisible: Em.computed(function() {
    var placeholder, value;
    placeholder = this.get('placeholder');
    value = this.get('value');
    if (placeholder && !value) {
      return true;
    }
  }).property('placeholder', 'value')
});

exports["default"] = textsupport;