`import styleSupport from '../mixins/style-support'`
`import sizeSupport from '../mixins/size-support'`
`import disabledSupport from '../mixins/disabled-support'`
`import widthSupport from '../mixins/width-support'`

button = Em.Component.extend styleSupport, sizeSupport, disabledSupport, widthSupport,
  classNameBindings: [':eui-button', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class']
  tagName: 'eui-button'

  label: null
  icon: null
  trailingIcon: null
  loading: null
  disabled: null
  action: null
  class: null
  type: 'button'
  width: 'auto'


  click: (event) ->
    event.preventDefault()
    @sendAction('action', @get('context'))

`export default button`
