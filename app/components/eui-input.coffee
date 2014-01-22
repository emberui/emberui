`import validationSupport from 'appkit/mixins/validation-support'`
`import textSupport from 'appkit/mixins/text-support'`
`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`

input = Em.Component.extend validationSupport, textSupport, styleSupport, sizeSupport,
  classNameBindings: [':eui-input']
  attributeBindings: ['computedWidth:style']

  maxlength: null

  computedWidth: Em.computed ->
    widths =
      tiny: '100px'
      small: '150px'
      medium: '200px'
      large: '250px'

    width = @get('width') or widths[@get('size')] or widths['medium']
    return "width: #{width};"
  .property 'size', 'width'

`export default input`
