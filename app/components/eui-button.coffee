`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import disabledSupport from 'appkit/mixins/disabled-support'`

button = Em.Component.extend styleSupport, sizeSupport, disabledSupport,
  classNameBindings: [':eui-button', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class']

  label: null
  icon: null
  trailingIcon: null
  loading: null
  disabled: null
  action: null
  class: null

  click: (event) ->
    event.preventDefault()
    @sendAction('action', @get('context'))

`export default button`
