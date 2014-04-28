`import styleSupport from '../mixins/style-support'`
`import animationsDidComplete from '../mixins/animations-did-complete'`
`import modalBehaviour from '../mixins/modal-behaviour'`
`import modalLayout from '../templates/eui-modal'`

modal = Em.Component.extend styleSupport, animationsDidComplete, modalBehaviour,
  layout: modalLayout
  tagName: 'eui-modal'
  classNames: ['eui-modal']
  classNameBindings: ['class']

  class: null

  # Actions will not bubble up from the programmatic modal so we need to create
  # pre-defined actions that the user can trigger to close the modal

  actions:
    cancel: (context) ->
      @sendAction 'cancel', context
      @hide()

    accept: (context) ->
      @sendAction 'accept', context
      @hide()


  # Catch and handle key presses

  keyDown: (event) ->
    # TAB
    @constrainTabNavigationToModal(event) if event.keyCode == 9

    # ESC
    if event.keyCode == 27
      @sendAction 'cancel'
      @hide()


modal.reopenClass
  # Creates the modal programmatically and inserts it into the DOM

  show: (options = {}) ->
    options.renderModal = true
    options.programmatic = true

    modal = this.create options
    modal.container = modal.get('targetObject.container')
    modal.appendTo 'body'
    modal

`export default modal`
