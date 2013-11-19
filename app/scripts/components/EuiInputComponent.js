EmberUI.EuiInputComponent = Ember.Component.extend(EmberUI.ValidationSupport, EmberUI.TextSupport, {
  classNameBindings: [':eui-input'],
  attributeBindings: ['computedWidth:style'],

  maxlength: null,

  computedWidth: function() {
    var widths = {'tiny': '100px', 'small': '150px', 'medium': '200px', 'large': '250px'};
    return 'width: ' + (this.get('width') || widths[this.get('size')] || widths['medium']);
  }.property('style', 'size', 'width')
});
