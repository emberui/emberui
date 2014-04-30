define(
  ["exports"],
  function(__exports__) {
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
      setInputId: (function() {
        return this.set('inputId', this.$('input').attr('id') || this.$('textarea').attr('id'));
      }).on('didInsertElement'),
      placeholderVisible: Em.computed('placeholder', 'value', function() {
        var placeholder, value;
        placeholder = this.get('placeholder');
        value = this.get('value');
        if (placeholder && !value) {
          return true;
        }
      })
    });

    __exports__["default"] = textsupport;
  });