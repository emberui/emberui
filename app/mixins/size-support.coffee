sizesupport = Em.Mixin.create
  size: 'medium'

  computedSize: Em.computed ->
    return 'eui-' + @.get('size')
  .property 'size'

`export default sizesupport`
