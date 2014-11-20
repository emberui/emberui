`import className from '../mixins/class-name'`
`import errorSupport from '../mixins/error-support'`
`import textSupport from '../mixins/text-support'`
`import widthSupport from '../mixins/width-support'`

input = Em.Component.extend errorSupport, textSupport, className, widthSupport,
  tagName: 'eui-input'
  baseClass: 'input'
  style: 'default'
  size: 'medium'
  
  maxlength: null
  type: 'text'

  # Action to call if user presses enter
  action: null

  actions:
    enter: (context) ->
      if @get 'action'
        @sendAction 'action', context

`export default input`
