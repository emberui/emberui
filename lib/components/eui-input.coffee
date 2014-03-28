`import validationSupport from 'build/mixins/validation-support'`
`import textSupport from 'build/mixins/text-support'`
`import styleSupport from 'build/mixins/style-support'`
`import sizeSupport from 'build/mixins/size-support'`
`import widthSupport from 'build/mixins/width-support'`

input = Em.Component.extend validationSupport, textSupport, styleSupport, sizeSupport, widthSupport,
  classNameBindings: [':eui-input']

  maxlength: null

`export default input`
