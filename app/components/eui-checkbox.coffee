`import validationSupport from 'appkit/mixins/validation-support'`
`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`

checkbox = Em.Component.extend validationSupport, styleSupport, sizeSupport,
  classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class']

  value: false
  disabled: false

  click: ->
    @toggleProperty('value') unless @get('disabled')


`export default checkbox`
