`import errorSupport from '../mixins/error-support'`
`import styleSupport from '../mixins/style-support'`
`import sizeSupport from '../mixins/size-support'`

checkbox = Em.Component.extend errorSupport, styleSupport, sizeSupport,
  classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class']
  tagName: 'eui-checkbox'

  value: false
  disabled: false

  click: ->
    @toggleProperty('value') unless @get('disabled')


`export default checkbox`
