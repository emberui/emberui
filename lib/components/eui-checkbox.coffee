`import errorSupport from '../mixins/error-support'`
`import className from '../mixins/class-name'`

checkbox = Em.Component.extend errorSupport, className,
  classNameBindings: [':eui-checkbox', 'value:eui-checked', 'disabled:eui-disabled', 'class']
  attributeBindings: ['role', 'value:aria-checked', 'disabled:aria-disabled']
  baseClass: 'checkbox'
  style: 'default'
  size: 'medium'
  tagName: 'eui-checkbox'

  role: 'checkbox'

  value: false
  disabled: false

  click: ->
    @toggleProperty('value') unless @get('disabled')


`export default checkbox`
