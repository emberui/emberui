disabledsupport = Em.Mixin.create
  classNameBindings: ['isDisabled:eui-disabled']
  disabled: false

  isDisabled:  Em.computed 'disabled', ->
    return true if @get('disabled')
      

`export default disabledsupport`
