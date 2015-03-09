`import className from '../mixins/class-name'`
`import disabledSupport from '../mixins/disabled-support'`
`import widthSupport from '../mixins/width-support'`

button = Em.Component.extend className, disabledSupport, widthSupport,
  classNameBindings: ['loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class']
  baseClass: 'button'
  tagName: 'eui-button'
  style: 'default'
  size: 'medium'

  label: null
  leadingIcon: null
  trailingIcon: null
  loading: null
  disabled: null
  action: null
  class: null
  type: 'button'
  width: 'auto'

  ariaOwns: null
  ariaHaspopup: null

  click: (event) ->
    event.preventDefault()
    @sendAction('action', @get('context'))


`export default button`
