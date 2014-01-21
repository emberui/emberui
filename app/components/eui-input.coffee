`import validationSupport from 'appkit/mixins/validation-support'`
`import textSupport from 'appkit/mixins/text-support'`

input = Ember.Component.extend validationSupport, textSupport,
  classNameBindings: [':eui-input']
  attributeBindings: ['computedWidth:style']

  maxlength: null

  computedWidth: Ember.computed ->
    widths =
      tiny: '100px'
      small: '150px'
      medium: '200px'
      large: '250px'

    return 'width: ' + (@.get('width') or widths[@.get('size')] or widths['medium'])
  .property 'style', 'size', 'width'

`export default input`
