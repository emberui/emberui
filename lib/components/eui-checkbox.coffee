`import validationSupport from 'build/mixins/validation-support'`
`import styleSupport from 'build/mixins/style-support'`
`import sizeSupport from 'build/mixins/size-support'`

checkbox = Em.Component.extend validationSupport, styleSupport, sizeSupport,
  classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class']

  value: false
  disabled: false

  click: ->
    @toggleProperty('value') unless @get('disabled')


`export default checkbox`
