disabledsupport = Em.Mixin.create
  classNameBindings: ['isDisabled:eui-disabled']
  disabled: false

  isDisabled:  Em.computed ->
    if @get('disabled') or @get('loading')
      return true
  .property 'disabled', 'loading'

`export default disabledsupport`
