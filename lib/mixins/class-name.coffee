classname = Em.Mixin.create
  classNameBindings: ['className']
  size: 'medium'
  style: 'default'

  className: Em.computed 'size', 'style', ->
    baseClass = @get 'baseClass'
    size = @get 'size'
    style = @get 'style'

    return "eui-#{baseClass}-#{size}-#{style}"


`export default classname`
