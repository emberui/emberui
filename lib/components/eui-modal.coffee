`import styleSupport from '../mixins/style-support'`
`import modalLayout from '../templates/eui-modal'`

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

    # Figure out if there is a closing animation so we can wait for it to finish
    # before we remove the view from the DOM. The only gotcha is if you have a
    # open animation then you must have a closing animation
    animation = false
    domPrefixes = ['Webkit', 'Moz', 'O', 'ms']

    # check no-prefix support
    animation = true if this.$().css('animationName')

    for prefix in domPrefixes
      animation = true if this.$().css(prefix + 'animationName')

    if animation
      @$().one 'webkitAnimationEnd mozAnimationEnd oanimationend msAnimationEnd animationend', =>
        @destroy()
    else
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
