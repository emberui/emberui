import euiInput from '../components/eui-input';

export default euiInput.extend({
  attributeBindings: ['computedWidthAndHeight:style'],

  height: null,

  computedWidthAndHeight: Em.computed('size', 'width', 'height', function() {
    const widths = {
      tiny: '100px',
      small: '150px',
      medium: '200px',
      large: '250px'
    };
    const heights = {
      tiny: '50px',
      small: '75px',
      medium: '100px',
      large: '125px'
    };

    let width = this.get('width') || widths[this.get('size')] || widths['medium'];
    let height = this.get('height') || heights[this.get('size')] || heights['medium'];

    return new Ember.String.htmlSafe(`width: ${width}; height: ${height}`);
  })
});
