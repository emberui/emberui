stylesupport = Em.Mixin.create
  classNameBindings: ['computedStyle']
  style: 'default'

  computedStyle:  Em.computed ->
    return 'eui-' + @get('style')
  .property 'style'

`export default stylesupport`
