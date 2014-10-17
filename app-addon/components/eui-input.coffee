`import errorSupport from '../mixins/error-support'`
`import textSupport from '../mixins/text-support'`
`import styleSupport from '../mixins/style-support'`
`import sizeSupport from '../mixins/size-support'`
`import widthSupport from '../mixins/width-support'`

input = Em.Component.extend errorSupport, textSupport, styleSupport, sizeSupport, widthSupport,
  classNameBindings: [':eui-input']
  tagName: 'eui-input'

  maxlength: null
  type: 'text'

  # Action to call if user presses enter
  action: null

  actions:
    enter: (context) ->
      if @get 'action'
        @sendAction 'action', context

`export default input`
