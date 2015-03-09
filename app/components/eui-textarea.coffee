`import className from '../mixins/class-name'`
`import errorSupport from '../mixins/error-support'`
`import textSupport from '../mixins/text-support'`

textarea = Em.Component.extend errorSupport, textSupport, className,
  attributeBindings: ['computedWidthAndHeight:style']
  tagName: 'eui-textarea'
  baseClass: 'input'
  style: 'default'
  size: 'medium'

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
