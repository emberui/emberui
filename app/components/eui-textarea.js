import validationSupport from 'appkit/mixins/validation-support';
import textSupport from 'appkit/mixins/text-support';

export default Ember.Component.extend(validationSupport, textSupport, {
  classNameBindings: [':eui-textarea'],
  attributeBindings: ['computedWidthAndHeight:style'],

  height: null,

  computedWidthAndHeight: function() {
    var widths = {'tiny': '100px', 'small': '150px', 'medium': '200px', 'large': '250px'};
    var heights = {'tiny': '50px', 'small': '75px', 'medium': '100px', 'large': '125px'};
    return 'width: ' + (this.get('width') || widths[this.get('size')] || widths['medium']) + '; ' +
              'height: ' + (this.get('height') || heights[this.get('size')] || heights['medium']) + ';';
  }.property('style', 'size', 'width', 'height')
});
