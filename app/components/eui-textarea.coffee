`import validationSupport from 'appkit/mixins/validation-support'`
`import textSupport from 'appkit/mixins/text-support'`

textarea = Ember.Component.extend validationSupport, textSupport,
  classNameBindings: [':eui-textarea']
  attributeBindings: ['computedWidthAndHeight:style']

  height: null

  computedWidthAndHeight: Ember.computed ->
    widths =
      tiny: '100px'
      small: '150px'
      medium: '200px'
      large: '250px'

    heights =
      tiny: '50px'
      small: '75px'
      medium: '100px'
      large: '125px'

    width = @.get('width') or widths[@.get('size')] or widths['medium']
    height = @.get('height') or heights[@.get('size')] or heights['medium']
    return "width: #{width}; height: #{height};"
  .property 'size', 'width', 'height'

`export default textarea`
