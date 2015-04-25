# Shared mixin used by input and textarea
textsupport = Em.Mixin.create
  tagName: 'div'
  classNameBindings: ['computedSize', 'computedStyle', 'class']

  width: null
  name: null
  disabled: null
  tabindex: null
  placeholder: null
  value: null
  class: null
  required: null
  error: null
  inputId: null

  # We need to bind the value of the label to the textarea's id because IE8 and IE9 doesn't support pointer-events: none;
  setInputId: (->
    @set('inputId', @$('input').attr('id') or @$('textarea').attr('id'))
  ).on('didInsertElement')

  placeholderVisible: Em.computed 'placeholder', 'value', ->
    placeholder = @get('placeholder')
    value = @get('value')

    if placeholder and !value
      return true

`export default textsupport`
