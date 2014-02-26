`import styleSupport from 'appkit/mixins/style-support'`
`import modalLayout from 'appkit/templates/components/eui-modal'`

modal = Em.Component.extend styleSupport,
  layout: modalLayout
  classNames: ['eui-modal']

  content: null

  actions:
    closeModal: ->
      @hide()

  hide: ->
    @set('isOpen', false)
    @destroy()

  didInsertElement: ->
    @set('isOpen', true)


modal.reopenClass
  show: (options = {}) ->
    modal = this.create options
    modal.appendTo 'body'
    modal

`export default modal`
