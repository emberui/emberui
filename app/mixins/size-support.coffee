sizesupport = Em.Mixin.create
  classNameBindings: ['computedSize']
  size: 'medium'

  computedSize: Em.computed 'size', ->
    return 'eui-' + @get('size')

`export default sizesupport`
