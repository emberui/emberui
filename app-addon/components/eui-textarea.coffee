`import errorSupport from '../mixins/error-support'`
`import textSupport from '../mixins/text-support'`
`import styleSupport from '../mixins/style-support'`
`import sizeSupport from '../mixins/size-support'`

textarea = Em.Component.extend errorSupport, textSupport, styleSupport, sizeSupport,
  classNameBindings: [':eui-textarea']
  attributeBindings: ['computedWidthAndHeight:style']
  tagName: 'eui-textarea'

  height: null

  computedWidthAndHeight: Em.computed 'size', 'width', 'height', ->
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

    width = @get('width') or widths[@get('size')] or widths['medium']
    height = @get('height') or heights[@get('size')] or heights['medium']
    return "width: #{width}; height: #{height};"

`export default textarea`
