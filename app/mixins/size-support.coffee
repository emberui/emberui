sizesupport = Em.Mixin.create
  classNameBindings: ['computedSize']
  size: 'medium'

  computedSize: Em.computed ->
    return 'eui-' + @get('size')
  .property 'size'

`export default sizesupport`
