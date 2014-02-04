`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`

button = Em.Component.extend styleSupport, sizeSupport,
  tagName: 'button'
  classNameBindings: [':eui-button', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class']
  attributeBindings: ['isDisabled:disabled']

  label: null
  icon: null
  trailingIcon: null
  loading: null
  disabled: null
  action: null
  class: null

  isDisabled:  Em.computed ->
    if @get('disabled') or @get('loading')
      return true
  .property 'disabled', 'loading'

  click: (event) ->
    event.preventDefault()
    @sendAction('action', @get('context'))

`export default button`
