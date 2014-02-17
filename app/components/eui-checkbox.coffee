`import validationSupport from 'appkit/mixins/validation-support'`
`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`

checkbox = Em.Component.extend validationSupport, styleSupport, sizeSupport,
  classNameBindings: [':eui-checkbox', 'value:eui-checked']

  value: false

  click: ->
    @set('value', !@get('value'));


`export default checkbox`
