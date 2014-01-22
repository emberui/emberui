# Shared mixin used by input and textarea
textsupport = Em.Mixin.create
  tagName: 'div'
  classNameBindings: ['computedSize', 'computedStyle', 'class', 'computedErrorState:eui-error']

  width: null
  name: null
  disabled: null
  tabindex: null
  placeholder: null
  value: null
  class: null
  required: null
  hasError: null
  inputId: null

  # We need to bind the value of the label to the textarea's id because IE8 and IE9 doesn't support pointer-events: none;
  didInsertElement: ->
    @.set('inputId', @.$('input').attr('id') or @.$('textarea').attr('id'))

  placeholderVisible: Em.computed ->
    placeholder = @.get('placeholder')
    value = @.get('value')

    if placeholder and !value
      return true
  .property 'placeholder', 'value'

`export default textsupport`
