classname = Em.Mixin.create
  classNameBindings: ['className']

  className: Em.computed 'size', 'style', ->
    baseClass = @get 'baseClass'
    size = @get 'size'
    style = @get 'style'

    if size
      return "eui-#{baseClass}-#{size}-#{style}"
    else
      return "eui-#{baseClass}-#{style}"


`export default classname`
