import Ember from 'ember';

export default Ember.Mixin.create({
  attributeBindings: ['computedWidth:style'],

  computedWidth: Ember.computed('size', 'width', function() {
    const widths = {
      tiny: '100px',
      small: '150px',
      medium: '200px',
      large: '250px'
    };
    const width = this.get('width') || widths[this.get('size')] || widths['medium'];

    return `width: ${width};`;
  })
});
