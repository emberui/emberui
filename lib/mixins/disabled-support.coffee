disabledsupport = Em.Mixin.create
  classNameBindings: ['isDisabled:eui-disabled']
  disabled: false

  isDisabled:  Em.computed 'disabled', 'loading', ->
    if @get('disabled') or @get('loading')
      return true

`export default disabledsupport`
