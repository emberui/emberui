`import validationSupport from '../mixins/validation-support'`
`import textSupport from '../mixins/text-support'`
`import styleSupport from '../mixins/style-support'`
`import sizeSupport from '../mixins/size-support'`
`import widthSupport from '../mixins/width-support'`

input = Em.Component.extend validationSupport, textSupport, styleSupport, sizeSupport, widthSupport,
  classNameBindings: [':eui-input']

  maxlength: null

`export default input`
