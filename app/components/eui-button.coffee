button = Ember.Component.extend
  tagName: 'button'
  classNameBindings: [':eui-button', 'computedSize', 'computedStyle', 'loading:eui-loading', 'icon:eui-icon', 'label::eui-no-label', 'class']
  attributeBindings: ['isDisabled:disabled']

  label: null
  style: null
  size: null
  icon: null
  trailingIcon: null
  loading: null
  disabled: null
  action: null
  class: null

  computedSize: Ember.computed ->
    return 'eui-' + (@.get('size') or 'medium')
  .property 'size'

  computedStyle:  Ember.computed ->
    return 'eui-' + (@.get('style') or 'secondary')
  .property 'style'

  isDisabled:  Ember.computed ->
    if @.get('disabled') or @.get('loading')
      return true
  .property 'disabled', 'loading'

  click: (event) ->
    event.preventDefault()
    @.sendAction('action', this.get('context'))

`export default button`
