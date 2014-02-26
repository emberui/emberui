`import styleSupport from 'appkit/mixins/style-support'`
`import modalLayout from 'appkit/templates/components/eui-modal'`

modal = Em.Component.extend styleSupport,
  layout: modalLayout
  classNames: ['eui-modal']
  classNameBindings: ['class', 'isOpen::eui-closing']

  content: null
  class: null
  isOpen: null

  actions:
    closeModal: ->
      @hide()

  hide: ->
    @set('isOpen', false)
    @$().one 'webkitAnimationEnd oanimationend msAnimationEnd animationend', =>
      @destroy()

  didInsertElement: ->
    @set('isOpen', true)


modal.reopenClass
  show: (options = {}) ->
    modal = this.create options
    modal.container = modal.get('targetObject.container')
    modal.appendTo 'body'
    modal

`export default modal`
