import validationSupport from 'appkit/mixins/validation-support';
import textSupport from 'appkit/mixins/text-support';

export default Ember.Component.extend(validationSupport, textSupport, {
  classNameBindings: [':eui-input'],
  attributeBindings: ['computedWidth:style'],

  maxlength: null,

  computedWidth: function() {
    var widths = {'tiny': '100px', 'small': '150px', 'medium': '200px', 'large': '250px'};
    return 'width: ' + (this.get('width') || widths[this.get('size')] || widths['medium']);
  }.property('style', 'size', 'width')
});
