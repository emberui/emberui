`import validationSupport from 'appkit/mixins/validation-support'`
`import textSupport from 'appkit/mixins/text-support'`
`import styleSupport from 'appkit/mixins/style-support'`
`import sizeSupport from 'appkit/mixins/size-support'`
`import widthSupport from 'appkit/mixins/width-support'`

input = Em.Component.extend validationSupport, textSupport, styleSupport, sizeSupport, widthSupport,
  classNameBindings: [':eui-input']

  maxlength: null

`export default input`
