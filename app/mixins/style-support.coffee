stylesupport = Em.Mixin.create
  style: 'default'

  computedStyle:  Em.computed ->
    return 'eui-' + @.get('style')
  .property 'style'

`export default stylesupport`
