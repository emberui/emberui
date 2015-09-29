widthsupport = Em.Mixin.create
  attributeBindings: ['computedWidth:style']

  computedWidth: Em.computed 'size', 'width', ->
    widths =
      tiny: '100px'
      small: '150px'
      medium: '200px'
      large: '250px'

    width = @get('width') or widths[@get('size')] or widths['medium']
    string = "width: #{width};"

    return string

`export default widthsupport`
